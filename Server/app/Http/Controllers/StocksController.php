<?php

namespace App\Http\Controllers;

use App\Http\Resources\StocksResource;
use App\Models\Stocks;
use Illuminate\Http\Request;

class StocksController extends Controller
{
    protected $resource = StocksResource::class;
    protected $model = Stocks::class;
    protected $options = [

        'label' => 'required|string|max:64',
        'description' => 'string|max:255',
        'available_quantity' => 'required|numeric|min:0',
        'is_ingredient' => 'required|boolean'

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
    public function update(Request $request, string $stocks_id)
    {
       
        return updateTemplate($request, $this->model, $stocks_id, $this->resource, $this->options);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
