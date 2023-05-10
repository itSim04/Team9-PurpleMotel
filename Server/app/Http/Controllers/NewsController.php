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

        $images = [];
        $news_ids = [];


        foreach ($news as $key => $value) {

            $news_ids[] = $value->id;
            $images['news'][$value->id] = extractImages('News', $value->id);
        }


        $included = LikesNewsResource::collection(LikesNews::all()->whereIn('news_id', $news_ids));

        return generateResponse(200, NewsResource::collection($news), $included, false, $images);
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

        $news = News::find($id);
        $images['news'][$id] = extractImages('News', $id);

        return generateResponse(200, new NewsResource($news), null, false, $images);
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

    public function like(Request $request)
    {

        // A function that takes a room_id and a user_id and creates a new Like with those attributes

        $request->validate([

            'news_id' => 'required|numeric',
            'user_id' => 'required|numeric'

        ]);

        if (LikesNews::all()->where('news_id', $request->news_id)->where('user_id', $request->user_id)->first()) {

            return generateResponse(200, "Already Liked", true);
        } else {

            $like = LikesNews::create([

                'news_id' => $request->news_id,
                'user_id' => $request->user_id

            ]);
        }

        return generateResponse(201, new LikesNewsResource($like), true);
    }

    public function unlike(Request $request)
    {

        // A function that does the opposite of the like function

        $request->validate([

            'news_id' => 'required|numeric',
            'user_id' => 'required|numeric'

        ]);

        $like = LikesNews::all()->where('news_id', $request->news_id)->where('user_id', $request->user_id)->first();
        if ($like) {


            $like->delete();


            return generateResponse(201, new LikesNewsResource($like), true);
        } else {


            return generateResponse(200, "Not Liked", true);
        }
    }

    public function isLiked(Request $request)
    {

        // A function that takes a room_id and a user_id and creates a new Like with those attributes

        $request->validate([

            'news_id' => 'required|numeric',
            'user_id' => 'required|numeric'

        ]);

        if (LikesNews::all()->where('news_id', $request->news_id)->where('user_id', $request->user_id)->first()) {

            return generateResponse(200, true, true);
        } else {


            return generateResponse(201, false, true);
        }
    }
}
