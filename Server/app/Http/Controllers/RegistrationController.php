<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserResource;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\UserTypeResource;
use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use App\Http\Requests\StoreRegistrationRequest;
use App\Http\Requests\UpdateRegistrationRequest;
use App\Models\User;
use App\Models\UserType;
use App\Models\Activity;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    protected $resource = RegistrationResource::class;
    protected $model = Registration::class;
    protected $model_name = 'Registrations';
    protected $options = [

        'activity_id' => 'required|string',
        'user_id' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date',


    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return indexTemplate($this->model, $this->resource, [
            
            User::class => UserResource::class, 
            UserType::class => UserTypeResource::class, 
            Activity::class => ActivityResource::class
        
        ]);
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
    public function update(Request $request, string $activity_id)
    {

        return updateTemplate($request, $this->model, $activity_id, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
