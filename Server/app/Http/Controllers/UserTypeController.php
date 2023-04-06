<?php

namespace App\Http\Controllers;

use App\Models\UserType;
use Illuminate\Http\Request;
use App\Http\Resources\UserTypeResource;

class UserTypeController extends Controller
{
    protected $resource = UserTypeResource::class;
    protected $model = UserType::class;
    protected $model_name = 'UserTypes';
    protected $options = [

        'label' => 'required|string',
        'description' => 'string'

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
    public function update(Request $request, string $id)
    {

        return updateTemplate($request, $this->model, $id, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
