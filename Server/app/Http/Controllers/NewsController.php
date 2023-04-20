<?php

namespace App\Http\Controllers;

use App\Http\Resources\LikesNewsResource;
use App\Http\Resources\NewsResource;
use App\Models\LikesNews;
use App\Models\News;
use App\Models\Room;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    protected $resource = NewsResource::class;
    protected $model = News::class;
    protected $options = [

        'title' => 'required|string|max:64',
        'body' => 'string|max:255',
        'date' => 'required|string|max:32',
        'likes' => 'numeric|min:0'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if (isset($request->index) && isset($request->size)) {

            $news = News::all()->skip($request->index)->take($request->size);
        } else {

            $news = News::all();
        }

        foreach ($news as $key => $value) {

            $news_ids[] = $value->id;
        }

        $included = LikesNewsResource::collection(LikesNews::all()->whereIn('news_id', $news_ids));

        return generateResponse(200, NewsResource::collection($news), $included);
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

        return showTemplate($this->model, $this->resource, $id, LikesNews::class, LikesNewsResource::class, 'news_id');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $news_id)
    {

        return updateTemplate($request, $this->model, $news_id, $this->resource, $this->options);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
