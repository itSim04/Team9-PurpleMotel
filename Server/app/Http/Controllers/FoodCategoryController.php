<?php

namespace App\Http\Controllers;

use App\Models\FoodCategory;
use App\Http\Resources\FoodCategoryResource;
use Illuminate\Http\Request;

class FoodCategoryController extends Controller
{
    protected $resource = FoodCategoryResource::class;
    protected $model = FoodCategory::class;
    protected $model_name = 'FoodCategories';
    protected $options = [

        'label' => 'required|string|max:64',

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $foods = FoodCategory::all();

        foreach ($foods->pluck('id') as $id) {

            $images['food_categories'][$id] = extractImages('Food Categories', $id);
        }

        return generateResponse(200, $foods, [], false, $images);
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

        $foods = FoodCategory::find($id);

        $images['food_categories'][$id] = extractImages('Food Categories', $id);

        return generateResponse(200, $foods, [], false, $images);
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
