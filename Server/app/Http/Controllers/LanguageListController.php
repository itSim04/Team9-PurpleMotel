<?php

namespace App\Http\Controllers;

use App\Http\Resources\LanguageListResource;
use App\Models\LanguageList;
use Illuminate\Http\Request;

class LanguageListController extends Controller
{
    protected $resource = LanguageListResource::class;
    protected $model = LanguageList::class;
    protected $model_name = 'Languages';
    protected $options = [

        'language_name' => 'required|string|unique:Language_Lists',
        'code_name' => 'required|string'

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
