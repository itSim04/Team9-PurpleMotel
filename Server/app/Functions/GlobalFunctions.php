<?php

use Illuminate\Http\Request;

function generateResponse(int $code, $collection = null, $included = [], bool $error = false)
{

    $response = ['status' => $error ? 'error' : 'success'];

    if ($collection) {

        $response[$error ? 'message' : 'data'] = $collection;
        $response['included'] = $included;
    }

    return response()->json($response, $code);
}

function indexTemplate(string $model, string $resource, string $extra_model = null, string $extra_resource = null)
{
    return generateResponse(200, $resource::collection($model::all()), $extra_resource ? $extra_resource::collection($extra_model::all()) : []);
}

function updateTemplate(Request $request, string $model, string $id, string $resource, array $options)
{

    $options = str_replace('required|', '', $options);

    $request->validate($options);

    $old = $model::find($id);

    $credentials = $request->only(array_keys($options));

    try {
        
        $data = $old->update($credentials);

        if ($data) {

            return generateResponse(201, new $resource($old));
            
        } else {

            return generateResponse(500, "An error occured", true);
        }

    } catch (Exception $e) {

        return generateResponse(500, $e->getMessage(), true);
    }
}

function storeTemplate(Request $request, string $model, string $resource, array $options)
{

    $request->validate($options);

    $credentials = $request->only(array_keys($options));


    try {

        $data = $model::create($credentials);
        return generateResponse(201, new $resource($data));

    } catch (Exception $e) {

        return generateResponse(500, $e->getMessage(), true);

    }
}

function showTemplate(string $model, string $resource, int $id, string $extra_model = null, string $extra_resource = null)
{

    $data = $model::find($id);

    if ($data) {

        return generateResponse(200, new $resource($data), $extra_resource && $extra_model ? [new $extra_resource($extra_model::find($data->type))] : []);
    } else {

        return generateResponse(404, $id . " not in Database", true);
    }
}

function destroyTemplate(string $model, int $id, string $safety_check = null, string $foreign_key = null, string $primary_key = null, string $safety_resource = null)
{

    if($safety_check) {

        $data = $model::find($id);

        return generateResponse(200, $safety_resource::collection($safety_check::where($foreign_key, $data->$primary_key)->get()), [], true);


    }

    if ($model::destroy($id)) {

        return generateResponse(200, null);

    } else {

        return generateResponse(404, $id . ' not in database', true);

    }
}
