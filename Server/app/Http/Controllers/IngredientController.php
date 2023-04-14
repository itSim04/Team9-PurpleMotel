<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Http\Requests\StoreIngredientRequest;
use App\Http\Requests\UpdateIngredientRequest;
use App\Http\Resources\IngredientResource;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    protected $resource = IngredientResource::class;
    protected $model = Ingredient::class;
    protected $model_name = 'Ingredients';
    protected $options = [

        'food_id' => 'required|numeric',
        'stock_id' => 'required|numeric',
        'required' => 'required|boolean',
        'quantity' => 'required|numeric|min:1'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
