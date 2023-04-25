<?php

namespace App\Http\Controllers;

use App\Http\Resources\LanguageResource;
use App\Models\Language;
use App\Models\LanguageList;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    protected $resource = LanguageResource::class;
    protected $model = Language::class;
    protected $model_name = 'Languages';
    protected $options = [

        'language' => 'required|numeric',
        'term' => 'required|string',
        'value' => 'required|string'

    ];

    /**
     * Display the specified resource.
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
        return indexTemplate($this->model, $this->resource, condition: 'language', condition_value: $id);
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

    public function getTerms(Request $request) {

        $request->validate([
            'language' => 'required|numeric'
        ]);
        $languages = Language::all()->where('language', $request->language);

        $terms = [];

        foreach($languages as $language) {
            $terms[$language->term] = $language->value;
        }

        return generateResponse(200, $terms);


    }
}
