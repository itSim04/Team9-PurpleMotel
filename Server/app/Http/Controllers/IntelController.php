<?php

namespace App\Http\Controllers;

use App\Models\Intel;
use App\Http\Requests\StoreIntelRequest;
use App\Http\Requests\UpdateIntelRequest;
use App\Http\Resources\IntelResource;
use App\Models\Room;
use Illuminate\Http\Request;

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
    $preferences = $request->only(['quiet', 'smoke', 'view', 'wifi', 'tv', 'layout', 'proximity', 'bed', 'bathroom']);

    $scoredRooms = $rooms->map(function ($room) use ($preferences) {
        if ($room->intel === null) {
            return [
                'room' => $room,
                'score' => PHP_INT_MAX, // Assign maximum possible score to rooms with no intel data
            ];
        }

        $score = 0;

        foreach ($preferences as $key => $value) {
            $score += abs($room->intel->$key - $value);
        }

        return [
            'room' => $room,
            'score' => $score,
        ];
    });

    $sortedRooms = $scoredRooms->sortBy('score');

    $recommendedRoom = $sortedRooms->first()['room'];

    return response()->json([
        'recommended_room' => $recommendedRoom,
    ]);
}

}
