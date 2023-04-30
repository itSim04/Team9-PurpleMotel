<?php

namespace App\Http\Controllers;

use App\Http\Resources\EffectPromoCodesResource;
use App\Http\Resources\PromoCodeResource;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\RoomTypeResource;
use App\Models\AppliedPromoCodes;
use App\Models\EffectPromoCodes;
use App\Models\Intel;
use App\Http\Requests\StoreIntelRequest;
use App\Http\Requests\UpdateIntelRequest;
use App\Http\Resources\IntelResource;
use App\Http\Resources\RoomResource;
use App\Models\PromoCode;
use App\Models\Review;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IntelController extends Controller
{

    protected $resource = IntelResource::class;
    protected $model = Intel::class;
    protected $model_name = 'Intel';
    protected $options = [

        'room_id' => 'required|numeric',
        'user_id' => 'required|numeric',
        'quiet' => 'required|integer',
        'smoke' => 'required|integer',
        'view' => 'required|integer',
        'wifi' => 'required|integer',
        'tv' => 'required|integer',
        'layout' => 'required|integer',
        'proximity' => 'required|integer',
        'bed' => 'required|integer',
        'bathroom' => 'required|integer',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return indexTemplate($this->resource, $this->model_name);
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
    public function show(string $intel)
    {
        return showTemplate($this->model, $this->resource, $intel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $intel)
    {
        return updateTemplate($request, $this->model, $intel, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $intel)
    {
        return destroyTemplate($this->model, $intel, $this->model_name);
    }

    public function recommendRoom(Request $request)
    {
        $request->validate([
            'quiet' => 'required|integer',
            'smoke' => 'required|integer',
            'view' => 'required|integer',
            'wifi' => 'required|integer',
            'tv' => 'required|integer',
            'layout' => 'required|integer',
            'proximity' => 'required|integer',
            'bed' => 'required|integer',
            'bathroom' => 'required|integer',
        ]);

        $rooms = Room::with('intels')->get();

        $types = $rooms->pluck('type')->toArray();
        $ids = $rooms->pluck('id')->toArray();


        $preferences = $request->only(['quiet', 'smoke', 'view', 'wifi', 'tv', 'layout', 'proximity', 'bed', 'bathroom']);
        $totalPreferences = count($preferences);

        $scoredRooms = $rooms->map(function ($room) use ($preferences, $totalPreferences) {
            if ($room->intels->isEmpty()) {
                return [
                    'room' => $room,
                    'score' => PHP_INT_MAX,
                    'match_percentage' => 0,
                ];
            }

            $averagedIntel = [];

            // Calculate the average value for each preference across all intels associated with the room
            foreach ($preferences as $key => $value) {
                $averagedIntel[$key] = $room->intels->avg($key);
            }

            $score = 0;

            foreach ($preferences as $key => $value) {
                $score += abs(($averagedIntel[$key] - $value) / 10); // Scale the difference by the maximum range (10) before taking the absolute value
            }

            return $room;
        });

        $sortedRooms = $scoredRooms->sortBy('score');

        $images = [];

        $included = [];

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


        return generateResponse(200, RoomResource::collection($sortedRooms), $included, false, $images);
    }
}
