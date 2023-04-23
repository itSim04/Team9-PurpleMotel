<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    protected $resource = ImageResource::class;
    protected $model = Image::class;
    protected $options = [

        'model_name' => 'required|string|max:64',
        'url' => 'required|string|max:255'
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
        $request->validate([
            'image' => 'required|string',
            'model_name' => 'required|string',
            'id' => 'required|string',
        ]);

        $base64_image = $request->input('image');
        $model_name = $request->input('model_name');
        $id = $request->input('id');

        // Extract the image data and MIME type from the base64 string
        list($type, $data) = explode(';', $base64_image);
        list(, $data) = explode(',', $data);

        $data = base64_decode($data);

        // Generate a unique filename for the image
        $filename = uniqid() . '.' . explode('/', $type)[1];

        // Save the image file using Laravel's File Storage API
        Storage::disk('public')->put('images/' . $model_name . '/' . $id . '/' . $filename, $data);

        // Return a response indicating the image was saved
        return generateResponse(201, $filename);
    }


    public function browse(Request $request)
    {
        // Get the full path to the public directory
        $request->validate([
            'model_name' => 'required|string',
            'id' => 'required|string',
        ]);

        $model_name = $request->input('model_name');
        $id = $request->input('id');


        // Get all the image files in the public/images directory
        $files = Storage::disk('public')->allFiles('images/' . $model_name . '/' . $id);

        $imageData = [];
        foreach ($files as $file) {
            $contents = Storage::disk('public')->get($file);
            $base64 = base64_encode($contents);
            $imageData[] = [
                'filename' => $file,
                'base64' => $base64,
            ];
        }

        return response()->json(['images' => $imageData]);
    }
    public function destroy(Request $request)
    {
        // Get the full path to the public directory
        $request->validate([
            'model_name' => 'required|string',
            'id' => 'required|string',
            'filename' => 'required|string'
        ]);

        $model_name = $request->input('model_name');
        $id = $request->input('id');
        $filename = $request->input('filename');


        // Get all the image files in the public/images directory
        $file = Storage::disk('public')->exists('images/' . $model_name . '/' . $id . '/' . $filename);
        if ($file) {

            Storage::disk('public')->delete('images/' . $model_name . '/' . $id . '/' . $filename);
            return generateResponse(200);
        }

        return generateResponse(404);
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
    public function update(Request $request, string $image_id)
    {

        return updateTemplate($request, $this->model, $image_id, $this->resource, $this->options);
    }
}
