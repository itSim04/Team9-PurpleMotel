<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use App\Http\Resources\RoomTypeResource;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRoomTypeRequest;
use App\Http\Requests\UpdateRoomTypeRequest;

class RoomTypeController extends Controller
{

    protected $resource = RoomTypeResource::class;
    protected $model = RoomType::class;

    protected $options = [

        'label' => 'required|string|max:32',
        'price' => 'required|numeric',
        'adults_capacity' => 'required|integer|min:0',
        'adults_with_kids_capacity' => 'required|integer|min:0',
        'kids_capacity' => 'required|integer|min:0',
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
    public function update(Request $request, string $roomType_id)
    {

        return updateTemplate($request, $this->model, $roomType_id, $this->resource, $this->options);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
