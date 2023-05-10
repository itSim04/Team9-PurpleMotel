<?php

namespace App\Http\Controllers;

use App\Http\Resources\FacilityResource;
use App\Models\Facility;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    protected $resource = FacilityResource::class;
    protected $model = Facility::class;
    protected $model_name = 'Facilities';
    protected $options = [

        'title' => 'required|string',
        'description' => 'required|string|max:255'
    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $facilities = Facility::all();

        $images = [];

        foreach ($facilities->pluck('id') as $id) {

            $images['facilities'][$id] = extractImages('Facility', $id);
        }

        return generateResponse(200, FacilityResource::collection($facilities), [], false, $images);
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
        $facilities = Facility::find($id);

        $images['facilities'][$id] = extractImages('Facility', $id);

        return generateResponse(200, new FacilityResource($facilities), [], false, $images);
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
