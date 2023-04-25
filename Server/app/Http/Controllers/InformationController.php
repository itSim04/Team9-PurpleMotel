<?php

namespace App\Http\Controllers;

use App\Models\Information;
use App\Http\Requests\StoreInformationRequest;
use App\Http\Requests\UpdateInformationRequest;
use App\Http\Resources\InformationResource;
use Illuminate\Http\Request;

class InformationController extends Controller
{
    protected $resource = InformationResource::class;
    protected $model = Information::class;
    protected $model_name = 'Informations';
    protected $options = [

        'record' => 'required|string|max:32',
        'value' => 'required|string'
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

    public function getInformation(Request $request)
    {

        $informations = Information::all();

        $terms = [];

        foreach ($informations as $information) {
            $terms[$information->record] = $information->value;
        }

        return generateResponse(200, $terms);
    }
}
