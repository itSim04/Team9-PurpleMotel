<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnnouncementsResource;
use App\Http\Resources\UserResource;
use App\Models\Announcements;
use App\Models\User;
use Illuminate\Http\Request;

class AnnouncementsController extends Controller
{
    protected $resource = AnnouncementsResource::class;
    protected $model = Announcements::class;
    protected $options = [

        'label' => 'required|string|max:64',
        'body' => 'string|max:255',
        'concerned_tier' => 'required|numeric',
        'author_id' => 'required|numeric'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $announcements = Announcements::all();

        $users = UserResource::collection(User::all()->whereIn('id', $announcements->pluck('author_id')));

        return generateResponse(200, AnnouncementsResource::collection($announcements), $users);
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
    public function update(Request $request, string $announcements_id)
    {

        return updateTemplate($request, $this->model, $announcements_id, $this->resource, $this->options);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
