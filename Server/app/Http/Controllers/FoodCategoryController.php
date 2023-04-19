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
