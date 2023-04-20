<?php

namespace App\Http\Controllers;

use App\Models\LikesNews;
use App\Models\Room;
use App\Models\RoomType;
use App\Http\Resources\RoomResource;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Http\Resources\BookingResource;
use App\Http\Resources\EffectPromoCodesResource;
use App\Http\Resources\LikesNewsResource;
use App\Http\Resources\PromoCodeResource;
use App\Http\Resources\RoomTypeResource;
use App\Models\AppliedPromoCodes;
use App\Models\Booking;
use App\Models\EffectPromoCodes;
use App\Models\PromoCode;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    protected $options = [

        'level' => 'required|numeric|between:-1000,1000',
        'number' => 'required|numeric|between:0,1000',
        'type' => 'required|numeric|integer|between:1,1000',
        'open' => 'boolean',
        'rating' => 'numeric|integer:between:0,50',
        'label' => 'required|string',
        'description' => 'string'

    ];
    protected $resource = RoomResource::class;
    protected $model = Room::class;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if (isset($request->index) && isset($request->size)) {

            $room = Room::all()->skip($request->index)->take($request->size);
        } else {

            $room = Room::all();
        }

        $types = [];
        $ids = [];

        foreach ($room as $key => $value) {

            $types[] = $value->type;
            $ids[] = $value->id;
        }

        $included = RoomTypeResource::collection(RoomType::all()->whereIn('id', $types));

        $user = Auth::user();

        if ($user) {






            $applied_code = AppliedPromoCodes::all()
                ->where('user_id', $user->id);


            $promo_code_ids = [];
            foreach ($applied_code as $key => $value) {

                $promo_code_ids[] = $value->promo_id;
            }
            $effect_code = EffectPromoCodes::all()
                ->whereIn('id', $promo_code_ids);

            $effective_ids = [];
            $actual_effect = [];


            foreach ($effect_code as $key => $value) {

                switch ($value->type) {

                    case 0:

                        if (in_array($value->effect_id, $ids)) {

                            $effective_ids[] = $value->promo_id;
                            $actual_effect[] = $value;
                        }
                        break;

                    case 1:

                        if (in_array($value->effect_id, $types)) {

                            $effective_ids[] = $value->promo_id;
                            $actual_effect[] = $value;
                        }
                        break;

                    case 2:

                        $effective_ids[] = $value->promo_id;
                        $actual_effect[] = $value;
                }
            }

            $promo_code = PromoCodeResource::collection(PromoCode::all()->whereIn('id', $effective_ids));

            $included = array_values($included
                ->concat($promo_code)
                ->concat(EffectPromoCodesResource::collection($actual_effect))
                ->all());
        }


        $included = array_values($included->all());

        return generateResponse(200, RoomResource::collection($room), $included);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        return storeTemplate($request, $this->model, $this->resource, $this->options);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {

        $room = Room::find($id);



        if ($room) {

            $user = Auth::user();
            $included = [new RoomTypeResource(RoomType::all()->where('id', $room->type)->first())];

            if ($user) {



                $applied_code = AppliedPromoCodes::all()
                    ->where('user_id', Auth::user()->id);

                $promo_code_ids = [];
                foreach ($applied_code as $key => $value) {

                    $promo_code_ids[] = $value->promo_id;
                }
                $effect_code = EffectPromoCodes::all()
                    ->whereIn('id', $promo_code_ids);

                $effective_ids = [];


                foreach ($effect_code as $key => $value) {

                    switch ($value->type) {

                        case 0:

                            if ($value->effect_id == $room->id) {

                                $effective_ids[] = $value->promo_id;
                            }
                            break;

                        case 1:

                            if ($value->effect_id == $room->type) {

                                $effective_ids[] = $value->promo_id;
                            }
                            break;

                        case 2:

                            $effective_ids[] = $value->promo_id;
                    }
                }

                $promo_code = PromoCode::all()->whereIn('id', $effective_ids)->first();


                if ($promo_code) {


                    $promo_code = new PromoCodeResource($promo_code);
                    $included[] = $promo_code;
                }
            }
            return generateResponse(200, new RoomResource($room), $included);
        } else {

            return generateResponse(404, $id . " not in Database", true);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $room_id)
    {

        return updateTemplate($request, $this->model, $room_id, $this->resource, $this->options);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }

    public function filter(Request $request)
    {

        $start_date = strtotime($request->check_in);
        $end_date = strtotime($request->check_out);

        $bookings = Booking::all();
        $conflictingBooking = [];
        foreach ($bookings as $booking) {

            $current_check_in = strtotime($booking->check_in);
            $current_end_date = strtotime($booking->end_date);


            if (!($end_date < $current_check_in || $start_date > $current_end_date)) {

                $conflictingBooking[] = $booking->room_id;
            }
        }


        return RoomResource::collection(Room::all()->whereNotIn('id', $conflictingBooking));
    }

    public function roomBookings(Request $request)
    {

        $request->validate([

            'room_id' => 'required|numeric'

        ]);

        return BookingResource::collection(Booking::all()->where('room_id', $request->room_id));
    }

    public function like(Request $request)
    {

        // A function that takes a room_id and a user_id and creates a new Like with those attributes

        $request->validate([

            'news_id' => 'required|numeric',
            'user_id' => 'required|numeric'

        ]);

        if (LikesNews::all()->where('news_id', $request->news_id)->where('user_id', $request->user_id)->first()) {

            return generateResponse(200, "Already Liked", true);
        } else {

            $like = LikesNews::create([

                'news_id' => $request->news_id,
                'user_id' => $request->user_id

            ]);
        }

        return generateResponse(201, new LikesNewsResource($like), true);
    }

    public function unlike(Request $request)
    {

        // A function that does the opposite of the like function

        $request->validate([

            'news_id' => 'required|numeric',
            'user_id' => 'required|numeric'

        ]);

        $like = LikesNews::all()->where('news_id', $request->news_id)->where('user_id', $request->user_id)->first();
        if ($like) {


            $like->delete();


            return generateResponse(201, new LikesNewsResource($like), true);
        } else {


            return generateResponse(200, "Not Liked", true);
        }
    }

    public function isLiked(Request $request)
    {

        // A function that takes a room_id and a user_id and creates a new Like with those attributes

        $request->validate([

            'news_id' => 'required|numeric',
            'user_id' => 'required|numeric'

        ]);

        if (LikesNews::all()->where('news_id', $request->news_id)->where('user_id', $request->user_id)->first()) {

            return generateResponse(200, true, true);
        } else {

            
            return generateResponse(201, false, true);

        }
    }
}
