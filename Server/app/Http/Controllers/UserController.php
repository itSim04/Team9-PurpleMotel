<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookingResource;
use App\Http\Resources\FoodResource;
use App\Http\Resources\OrderContainsResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoomResource;
use App\Http\Resources\RoomTypeResource;
use App\Http\Resources\UserResource;
use App\Models\Booking;
use App\Models\Food;
use App\Models\Order;
use App\Models\OrderContains;
use App\Models\Permission;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $resource = UserResource::class;
    protected $model = User::class;
    protected $model_name = 'Users';
    protected $options = [

        'email' => 'required|string|email|unique:Users',
        'password' => 'required|string|min:8',
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'phone' => 'required|string|unique:Users',
        'gender' => 'required|between:0,3',
        'date_of_birth' => 'required|date',
        'tier' => 'required|between:0,2|numeric',
        'type' => 'required|numeric',
        'language' => 'required|numeric'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return indexTemplate($this->model, $this->resource, [Permission::class => PermissionResource::class], 'is_singular', true);
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

        return updateTemplate($request, $this->model, $room_id, $this->resource, $this->options, $this->model_name, true);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }

    public function fetchProfile(Request $request)
    {

        // Fetches the id of the logged in user extracted from a token. This needs
        // more validation as the lack of a token in the request will cause this
        // code to crash.
        $id = Auth::user()->id;


        // // Area 1: Orders and Foods
        // //      Model 1: Orders - It has a field user-id which is the id of the user that ordered
        // //      Model 2: Food
        // //      Model 3: Pivot (OrderContains) - It has 2 foreign keys that reference Model 1 and 2

        // // We will store ALL orders in one array

        // // The all() function returns all entries of a model
        // $orders = Order::all()
        //     // The where function filters a collector. Param 1 is the filter column and Param 2 is the 
        //     // filter value itself. Since the Orders have the user_id field that will reference the user,
        //     // we can query based on that
        //     ->where('user_id', $id);

        // // We now want to store the ids of all the orders for future use
        // $order_ids = [];

        // // We will loop through the orders we retrieved earlier to extract the ids
        // foreach ($orders as $order) {

        //     // This syntax appends an element to an array. Since $order is built by the Order model
        //     // it has a field id which is what we want to fetch
        //     $order_ids[] = $order->id;
        // }

        // // The next step would be to retrieve all foods, but that is not directly possible as the
        // // order itself is not looked to foods, instead, a pivot table takes care of that. We will
        // // have to retrieve said pivot entries
        // $order_food_pivot = OrderContains::all()
        //     // since our pivot has a foreign key order_id that references orders, and since we already
        //     // have order ids, we can query based on that. whereIn takes an array of values instead of one
        //     ->whereIn('order_id', $order_ids);


        // // Now that we have the pivots we can retrieve the food id from every pivot item.
        // $food_ids = [];
        // foreach ($order_food_pivot as $pivot) {

        //     // As mentioned previously the pivot has a foreign key named food_id
        //     $food_ids[] = $pivot->food_id;
        // }

        // // Now that we have the id we can retrieve all the foods with said idea. We can directly englobe
        // // our result in a resource since we will not be operating on Foods.
        // $foods = FoodResource::collection(Food::all()->whereIn('id', $food_ids));

        // // Now we just have to merge our results through the merge function. Notice how we did
        // // not invoke the OrderResource previously as we were still operating on orders which is
        // // why we'll do it here
        // $result = OrderResource::collection($orders);
        // $result[] = $foods;


        // Start Here

        // Area 2: Bookings, Rooms and Room Types

        //      Model 1: Booking - It has a foreign key user_id that dictates the booker (us in this case)
        //      and a foreign key room_id which will lead us to the rooms
        //      Model 2: Room - It has a foreign key type which will lead us to the room types
        //      Model 3: Room Types

        // Good luck :) 

        $bookings = Booking::all()
            ->where("user_id", $id);

        $room_ids = [];

        foreach ($bookings as $booking) {

            $room_ids[] = $booking->room_id;
        }

        $rooms = Room::all()
            ->whereIn('id', $room_ids);

        $result = RoomResource::collection($rooms);
        $result[] = BookingResource::collection($bookings);




        $room_types_ids = [];

        foreach ($rooms as $type) {
            $room_types_ids[] = $type->type;
        }

        $room_types = RoomType::all()
            ->whereIn('id', $room_types_ids); 

        $result[] = RoomTypeResource::collection($room_types);


        return generateResponse(200, $result);
    }
}
