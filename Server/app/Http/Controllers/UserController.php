<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

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
        'tier' => 'required|between:0,2|numeric'

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
    public function update(Request $request, string $room_id)
    {
       
        return updateTemplate($request, $this->model, $room_id, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
