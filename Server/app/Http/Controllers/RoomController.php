<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomType;
use App\Http\Resources\RoomResource;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Http\Resources\BookingResource;
use App\Http\Resources\RoomTypeResource;
use App\Models\Booking;

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
        return indexTemplate($this->model, $this->resource, [RoomType::class => RoomTypeResource::class]);
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
}
