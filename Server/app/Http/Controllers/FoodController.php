<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Http\Requests\StoreFoodRequest;
use App\Http\Requests\UpdateFoodRequest;
use App\Http\Resources\FoodCategoryResource;
use App\Http\Resources\FoodResource;
use App\Http\Resources\IngredientResource;
use App\Http\Resources\StocksResource;
use App\Models\FoodCategory;
use App\Models\Ingredient;
use App\Models\Stocks;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    protected $resource = FoodResource::class;
    protected $model = Food::class;
    protected $model_name = 'Foods';
    protected $options = [

        'label' => 'required|string|max:64',
        'description' => 'string|max:255',
        'price' => 'required|numeric|min:0',
        'is_served' => 'required|boolean'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $foods = Food::all();
        $food_id = [];
        $stock_id = [];
        $categories = [];

        foreach ($foods as $food) {

            $categories[] = $food->category;
            $food_id[] = $food->id;

        }

        $categories = collect($categories)->unique()->values()->all();

        $food_categories = FoodCategoryResource::collection(FoodCategory::all()->whereIn('id', $categories));

        $ingredients = Ingredient::all()->whereIn('food_id', $food_id);

        foreach ($ingredients as $id => $ingredient) {

            $stock_id[] = $ingredient->stock_id;

        }

        $stock = StocksResource::collection(Stocks::all()->whereIn('id', $stock_id));

        $included = $food_categories->merge([IngredientResource::collection($ingredients), $stock]);

        return generateResponse(200, FoodResource::collection($foods), $included);
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
    public function update(Request $request, string $food_id)
    {

        return updateTemplate($request, $this->model, $food_id, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
