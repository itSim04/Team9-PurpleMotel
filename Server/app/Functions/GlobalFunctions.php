<?php

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

function generateResponse(int $code, $collection = null, $included = [], bool $error = false)
{

    $response = ['status' => $error ? 'error' : 'success'];

    if ($collection) {

        $response[$error ? 'message' : 'data'] = $collection;
        $response['included'] = $included;
    }

    return response()->json($response, $code);
}

function extractPermissions($id) {

    $permissions = [];

    foreach (Permission::where('is_singular', true)->where('concerned_party', $id)->get() as $permission) {

        $permissions[$permission->label] = [$permission->read, $permission->write, $permission->delete];
    }
    return $permissions;

}

function indexTemplate(string $model, string $resource, string $extra_model = null, string $extra_resource = null)
{
    return generateResponse(200, $resource::collection($model::all()), $extra_resource ? $extra_resource::collection($extra_model::all()) : []);
}

function updateTemplate(Request $request, string $model, string $id, string $resource, array $options, string $model_table = null, bool $singular = true)
{

    $options = str_replace('required|', '', $options);

    $options = str_replace('|unique:' . $model_table, '', $options);

    $options = str_replace('|unique:' . $model_table, '', $options);

    $request->validate($options);

    $old = $model::find($id);

    $credentials = $request->only(array_keys($options));

    $updateData = [];

    foreach ($credentials as $key => $value) {

        if ($old->{$key} !== $value) {

            $updateData[$key] = $value;
        }
    }

    if ($model_table && isset($updateData['phone'])) {
        $request->validate([
            'phone' => 'unique:' . $model_table
        ]);
    }

    if ($model_table && isset($updateData['email'])) {
        $request->validate([
            'email' => 'unique:' . $model_table
        ]);
    }

    try {

        if (isset($request->permissions)) {
            foreach ($request->permissions as $key => $permission) {

                addPermissions($key, $id, $permission, $singular);
            }
        }

        if (!empty($updateData)) {

            $data = $old->update($updateData);

            if ($data) {


                return generateResponse(201, new $resource($old));
            } else {

                return generateResponse(500, "An error occured", true);
            }
        } else {
            return generateResponse(200);
        }
    } catch (Exception $e) {

        return generateResponse(500, $e->getMessage(), true);
    }
}

function addPermissions($label, string $concerned, $permission, bool $singular)
{
    $old = Permission::where('concerned_party', $concerned)->where('label', $label)->first();
    $permissions = sprintf("%03d", decbin(intval($permission)));
    $new = [

        'label' => $label,
        'concerned_party' => $concerned,
        'read' => $permissions[2],
        'write' => $permissions[1],
        'delete' => $permissions[0],
        'is_singular' => $singular

    ];

    if (!$old) {

        $new = Permission::create($new);
        return $new;
    } else {

        $old->update($new);
        return $old;
    }
}
function storeTemplate(Request $request, string $model, string $resource, array $options, bool $singular = true)
{

    $request->validate($options);

    $credentials = $request->only(array_keys($options));


    try {

        $data = $model::create($credentials);

        if (isset($request->permissions)) {
            foreach ($request->permissions as $key => $permission) {

                addPermissions($key, $data->id, $permission, $singular);
            }
        }

        return generateResponse(201, new $resource($data));
    } catch (Exception $e) {

        return generateResponse(500, $e->getMessage(), true);
    }
}

function showTemplate(string $model, string $resource, int $id, string $extra_model = null, string $extra_resource = null, string $concerned_key = null)
{

    $data = $model::find($id);

    if ($data) {

        return generateResponse(200, new $resource($data), $extra_resource && $extra_model && $concerned_key ? [$extra_resource::collection($extra_model::where($concerned_key, $data->id)->get())] : []);
    } else {

        return generateResponse(404, $id . " not in Database", true);
    }
}

function destroyTemplate(string $model, int $id, string $safety_check = null, string $foreign_key = null, string $primary_key = null, string $safety_resource = null)
{

    if ($safety_check) {

        $data = $model::find($id);

        return generateResponse(200, $safety_resource::collection($safety_check::where($foreign_key, $data->$primary_key)->get()), [], true);
    }

    if ($model::destroy($id)) {

        return generateResponse(200, null);
    } else {

        return generateResponse(404, $id . ' not in database', true);
    }
}
