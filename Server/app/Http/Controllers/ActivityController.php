<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use App\Http\Resources\RegistrationResource;
use App\Models\Activity;
use App\Models\Registration;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    protected $resource = ActivityResource::class;
    protected $model = Activity::class;
    protected $model_name = 'Activities';
    protected $options = [

        'title' => 'required|string',
        'description' => 'required|string|max:255',
        'capacity' => 'required|numeric',
        'price' => 'required|numeric',
        'start_date' => 'required|date',
        'end_date' => 'required|date'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $activities = Activity::all();

        $registration = Registration::all()->whereIn('activity_id', $activities->pluck('id'));

        foreach ($activities->pluck('id') as $id) {

            $images['activities'][$id] = extractImages('Activity', $id);
        }

        return generateResponse(200, ActivityResource::collection($activities), RegistrationResource::collection($registration), false, $images);
        // return indexTemplate($this->model, $this->resource, [Registration::class => RegistrationResource::class]);
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

        $activities = Activity::find($id);
        $registration = Registration::all()->where('activity_id', $id);

        $images['activities'][$id] = extractImages('Activity', $id);

        return generateResponse(200, new ActivityResource($activities), new RegistrationResource($registration), false, $images);
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
