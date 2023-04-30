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
use App\Http\Resources\ReviewResource;
use App\Http\Resources\RoomTypeResource;
use App\Models\AppliedPromoCodes;
use App\Models\Booking;
use App\Models\EffectPromoCodes;
use App\Models\PromoCode;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    protected $options = [

        'level' => 'required|numeric|between:-1000,1000',
        'number' => 'required|numeric|between:0,1000',
        'type' => 'required|numeric|integer|between:1,1000',
        'open' => 'boolean',
        'rating' => 'numeric|decimal:0,2|between:0,5',
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
        $images = [];

        foreach ($room as $key => $value) {

            $types[] = $value->type;
            $ids[] = $value->id;
        }

        $included = RoomTypeResource::collection(RoomType::all()->whereIn('id', $types));

        $review = ReviewResource::collection(Review::all()->whereIn('room_id', $ids));

        $user = Auth::user();

        if ($user) {

            $promo_code_ids = AppliedPromoCodes::all()
                ->where('exhausted', false)
                ->where('user_id', $user->id)->pluck('promo_id');



            $effect_code = EffectPromoCodes::all()
                ->whereIn('promo_id', $promo_code_ids);


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

            $promo_code = PromoCodeResource::collection(PromoCode::all()
                ->where('exhausted', false)
                ->whereIn('id', $effective_ids));

            $included = array_values($included
                ->concat($promo_code)
                ->concat(EffectPromoCodesResource::collection($actual_effect))
                ->concat($review)
                ->all());
        } else {

            $included = array_values($included
                ->concat($review)
                ->all());
        }

        foreach ($ids as $id) {

            $images['rooms'][$id] = extractImages('Room', $id);
        }


        return generateResponse(200, RoomResource::collection($room), $included, false, $images);
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

        $included = ReviewResource::collection(Review::all()->where('room_id', $id));

        if ($room) {

            $user = Auth::user();
            $included[] = new RoomTypeResource(RoomType::all()->where('id', $room->type)->first());

            if ($user) {



                $promo_code_ids = AppliedPromoCodes::all()
                    ->where('exhausted', false)
                    ->where('user_id', Auth::user()->id)->pluck('promo_id');


                $effect_code = EffectPromoCodes::all()
                    ->whereIn('promo_id', $promo_code_ids);

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

                $promo_code = PromoCode::all()
                    ->whereIn('id', $effective_ids)
                    ->first();


                if ($promo_code) {


                    $promo_code = new PromoCodeResource($promo_code);
                    $included[] = $promo_code;
                }
            }
            $images['rooms'][$id] = extractImages('Room', $id);

            return generateResponse(200, new RoomResource($room), $included, false, $images);
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

        if (isset($request->check_in) && isset($request->check_out)) {

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

            if (isset($request->index) && isset($request->size)) {

                $room = Room::all()->whereNotIn('id', $conflictingBooking)->skip($request->index)->take($request->size);
            } else {

                $room = Room::all()->whereNotIn('id', $conflictingBooking);
            }
        } else {

            $room = Room::all();
        }

        $types = $room->pluck('type');

        $room_type = RoomType::all()
            ->whereIn('id', $types);

        if ($request->adults_capacity) {


            $room_type = $room_type->where('adults_capacity', $request->adults_capacity);
        }
        if ($request->kids_capacity) {


            $room_type = $room_type
                ->merge($room_type->where('adults_capacity', $request->adults_capacity)
                    ->where('kids_capacity', $request->kids_capacity));
        }





        $types = $room_type->pluck('id');
        $room = $room->whereIn('type', $types);


        $ids = $room->pluck('id');

        $included = RoomTypeResource::collection($room_type);


        $review = ReviewResource::collection(Review::all()->whereIn('room_id', $ids));

        $user = Auth::user();

        if ($user) {

            $promo_code_ids = AppliedPromoCodes::all()
                ->where('exhausted', false)
                ->where('user_id', $user->id)->pluck('promo_id');



            $effect_code = EffectPromoCodes::all()
                ->whereIn('promo_id', $promo_code_ids);


            $effective_ids = [];
            $actual_effect = [];


            foreach ($effect_code as $key => $value) {

                switch ($value->type) {

                    case 0:

                        if (in_array($value->effect_id, $ids->toArray())) {

                            $effective_ids[] = $value->promo_id;
                            $actual_effect[] = $value;
                        }
                        break;

                    case 1:

                        if (in_array($value->effect_id, $types->toArray())) {

                            $effective_ids[] = $value->promo_id;
                            $actual_effect[] = $value;
                        }
                        break;

                    case 2:

                        $effective_ids[] = $value->promo_id;
                        $actual_effect[] = $value;
                }
            }

            $promo_code = PromoCodeResource::collection(PromoCode::all()
                ->where('exhausted', false)
                ->whereIn('id', $effective_ids));

            $included = array_values($included
                ->concat($promo_code)
                ->concat(EffectPromoCodesResource::collection($actual_effect))
                ->concat($review)
                ->all());
        } else {

            $included = array_values($included
                ->concat($review)
                ->all());
        }


        return generateResponse(200, RoomResource::collection($room), $included);
    }

    public function roomBookings(Request $request)
    {

        $request->validate([

            'room_id' => 'required|numeric'

        ]);

        return BookingResource::collection(Booking::all()->where('room_id', $request->room_id));
    }

    public function postReview(Request $request)
    {

        // This function posts a Review to the database

        $request->validate([

            'room_id' => 'required|numeric',
            'stars' => 'required|numeric|between:0,5',
            'user_id' => 'required|numeric',
            'title' => 'required|string',
            'content' => 'required|string',
            'date' => 'required|date'
        ]);


        $review = Review::all()->where('room_id', $request->room_id)->where('user_id', $request->user_id)->first();

        if ($review) {

            return generateResponse(400, "You have already posted a review for this room", true);
        } else {

            $review = Review::create([
                'room_id' => $request->room_id,
                'stars' => $request->stars,
                'user_id' => $request->user_id,
                'title' => $request->title,
                'content' => $request->content,
                'date' => $request->date
            ]);

            return generateResponse(200, $review, true);
        }
    }
}
