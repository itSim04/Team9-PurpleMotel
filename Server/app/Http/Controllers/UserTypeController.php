<?php

namespace App\Http\Controllers;

use App\Http\Resources\PermissionResource;
use App\Models\UserType;
use Illuminate\Http\Request;
use App\Http\Resources\UserTypeResource;
use App\Models\Permission;

class UserTypeController extends Controller
{

    function addPermissions($label, string $concerned, $permission)
    {
        $old = Permission::where('concerned_party', $concerned)->where('label', $label)->first();
        $permissions = sprintf("%03d", decbin(intval($permission)));
        $new = [

            'label' => $label,
            'concerned_party' => $concerned,
            'read' => $permissions[2],
            'write' => $permissions[1],
            'delete' => $permissions[0],
            'is_singular' => false

        ];

        if (!$old) {

            $new = Permission::create($new);
            return $new;
        } else {

            $old->update($new);
            return $old;
        }
    }

    protected $resource = UserTypeResource::class;
    protected $model = UserType::class;
    protected $model_name = 'UserTypes';
    protected $options = [

        'label' => 'required|string',
        'description' => 'string'

    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return indexTemplate($this->model, $this->resource, Permission::class, PermissionResource::class, 'is_singular', '0');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return storeTemplate($request, $this->model, $this->resource, $this->options, false);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {

        return showTemplate($this->model, $this->resource, $id, Permission::class, PermissionResource::class, 'concerned_party');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return updateTemplate($request, $this->model, $id, $this->resource, $this->options, $this->model_name, false);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }
}
