<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\FoodResource;
use App\Http\Resources\OrderContainsResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\UserResource;
use App\Models\Food;
use App\Models\OrderContains;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $resource = OrderResource::class;
    protected $model = Order::class;
    protected $model_name = 'Orders';
    protected $options = [

        'date' => 'required|date',
        'user_id' => 'required|numeric',
        'status' => 'required|numeric'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        $order_id = [];
        $user_ids = [];

        foreach ($orders as $order) {

            $user_ids[] = $order->user_id;
            $order_id[] = $order->id;
        }



        $user_ids = collect($user_ids)->unique()->values()->all();

        $users = UserResource::collection(User::all()->whereIn('id', $user_ids));

        $foods = OrderContains::all()->whereIn('order_id', $order_id);

        foreach ($foods as $id => $food) {

            $food_id[] = $food->food_id;
            $images['food'][$food->id] = extractImages('Food', $food->id);
        }

        $food_id = collect($food_id)->unique()->values()->all();

        $food = FoodResource::collection(Food::all());

        $included = $users->merge(OrderContainsResource::collection($foods));

        foreach ($food as $item) {

            $included[] = $item;
        }

        return generateResponse(200, OrderResource::collection($orders), $included, false, $images);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $response = storeTemplate($request, $this->model, $this->resource, $this->options);
        $order_id = (string)json_encode($response->original['data']->id);

        if (isset($request['food'])) {

            $stock_ids = [];
            foreach (OrderContains::all()->where('order_id', $order_id) as $stock) {

                $stock_ids[] = $stock->id;
            }
            OrderContains::destroy($stock_ids);

            foreach ($request['food'] as $stock) {

                $order_contains = [

                    'order_id' => $order_id,
                    'food_id' => $stock['id'],
                    'quantity' => $stock['quantity']

                ];
                OrderContains::create($order_contains);
            }
        }

        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {

        $order = Order::find($id);
        $food_id = [];

        $user = new UserResource(User::find($order->user_id));

        $order_contains = OrderContains::all()->whereIn('order_id', $order->id);

        foreach ($order_contains as $id => $food) {

            $food_id[] = $food->food_id;
        }

        $food_ids = collect($food_id)->unique()->values()->all();

        $foods = FoodResource::collection(Food::all()->whereIn('id', $food_ids));

        foreach ($food_ids as $food_id) {

            $images['food'][$food_id] = extractImages('Food', $food_id);
        }

        $included = $foods->merge(OrderContainsResource::collection($order_contains));

        $included[] = $user;


        return generateResponse(200, $order, $included, false, $images);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $order_id)
    {

        if (isset($request['food'])) {

            $stock_ids = [];
            foreach (OrderContains::all()->where('order_id', $order_id) as $stock) {

                $stock_ids[] = $stock->id;
            }
            OrderContains::destroy($stock_ids);

            foreach ($request['food'] as $stock) {

                $order_contains = [

                    'order_id' => $order_id,
                    'food_id' => $stock['id'],
                    'quantity' => $stock['quantity']

                ];
                OrderContains::create($order_contains);
            }
        }

        return updateTemplate($request, $this->model, $order_id, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
