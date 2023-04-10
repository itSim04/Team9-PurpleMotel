<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookingResource;
use App\Http\Resources\RoomResource;
use App\Http\Resources\RoomTypeResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserTypeResource;
use App\Models\Booking;
use App\Models\User;
use App\Models\UserType;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    protected $resource = BookingResource::class;
    protected $model = Booking::class;
    protected $model_name = 'Bookings';
    protected $options = [

        'room_id' => 'required|string',
        'user_id' => 'required|string',
        'check_in' => 'required|date',
        'end_date' => 'required|date',
        'exhausted' => 'required|boolean'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return indexTemplate($this->model, $this->resource, [User::class => UserResource::class, UserType::class => UserTypeResource::class, Room::class => RoomResource::class, RoomType::class => RoomTypeResource::class]);
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

        return updateTemplate($request, $this->model, $room_id, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
