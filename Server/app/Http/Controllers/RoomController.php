<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Http\Resources\RoomResource;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;

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
    public function index()
    {
        // return JWTAuth::parseToken()->authenticate();
        return indexTemplate($this->model, $this->resource);
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
        return showTemplate($this->model, $this->resource, $id);
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
}
