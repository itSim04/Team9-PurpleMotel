<?php

namespace App\Http\Controllers;

use App\Events\CustomCustomEvent;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\UserResource;
use App\Models\Permission;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $resource = UserResource::class;
    protected $model = User::class;
    protected $model_name = 'Users';
    protected $options = [

        'email' => 'required|string|email|unique:Users',
        'password' => 'required|string|min:8',
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'phone' => 'required|string|unique:Users',
        'gender' => 'required|between:0,3',
        'date_of_birth' => 'required|date',
        'tier' => 'required|between:0,2|numeric',
        'type' => 'required|numeric',
        'language' => 'required|numeric'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return indexTemplate($this->model, $this->resource, [Permission::class => PermissionResource::class], 'is_singular', true);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate($this->options);

        $credentials = $request->only(array_keys($this->options));


        try {

            $data = $this->model::create($credentials);

            $formatted_permissions = [];
            if (isset($request->permissions)) {

                $permissions = [];
                foreach ($request->permissions as $key => $permission) {

                    $permission = addPermissions($key, $data->id, $permission, true);

                    if ($permission) {

                        $permissions[] = $permission;
                    }
                }


                foreach ($permissions as $permission) {

                    $formatted_permissions[] = ucwords($permission['label']) . ': ' . $permission['read'] . ' ' . $permission['write'] . ' ' . $permission['delete'];
                }

                Permission::insert($permissions);
                
            }
            CustomCustomEvent::dispatch(null, $data, $formatted_permissions, $this->model_name, 4);

            return generateResponse(201, new $this->resource($data));
        } catch (Exception $e) {

            return generateResponse(500, $e->getMessage(), true);
        }
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

        $options = str_replace('required|', '', $this->options);

        $options = str_replace('|unique:' . $this->model_name, '', $options);

        $options = str_replace('|unique:' . $this->model_name, '', $options);

        $request->validate($options);

        $old = $this->model::find($id);

        $credentials = $request->only(array_keys($options));

        $updateData = [];

        foreach ($credentials as $key => $value) {

            if ($old->{$key} !== $value) {

                $updateData[$key] = $value;
            }
        }

        try {

            $formatted_permissions = [];
            if (isset($request->permissions)) {

                Permission::where('concerned_party', $id)->delete();
                $permissions = [];
                foreach ($request->permissions as $key => $permission) {

                    $permission = addPermissions($key, $id, $permission, true);

                    if ($permission) {

                        $permissions[] = $permission;
                    }
                }


                foreach ($permissions as $permission) {

                    $formatted_permissions[] = ucwords($permission['label']) . ' permissions for user ' . $id . ' changed: ' . $permission['read'] . ' ' . $permission['write'] . ' ' . $permission['delete'];
                }

                Permission::insert($permissions);
            }

            if (!empty($updateData)) {

                $old_data = clone $old;
                $data = $old->update($updateData);


                if ($data) {

                    CustomCustomEvent::dispatch($old_data, $updateData, $formatted_permissions, $this->model_name, 3);
                    return generateResponse(201, new $this->resource($old));
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
