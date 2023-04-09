<?php

namespace App\Http\Controllers;


use App\Models\PromoCode;
use App\Resources\PromoCodeResource;
use Illuminate\Http\Request;

class PromoCodeController extends Controller
{
    protected $resource = PromoCodeResource::class;
    protected $model = PromoCode::class;
    protected $model_name = 'PromoCodes';
    protected $options = [

        'change' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
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
    public function update(Request $request, string $promo_code_id)
    {

        return updateTemplate($request, $this->model, $promo_code_id, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
