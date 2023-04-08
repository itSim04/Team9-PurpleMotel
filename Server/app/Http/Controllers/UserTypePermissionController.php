<?php

namespace App\Http\Controllers;

use App\Http\Resources\PermissionResource;
use App\Models\Permission;
use Illuminate\Http\Request;

class UserTypePermissionController extends Controller
{
    function addPermissions($label, $concerned, $permission)
    {

        $old = Permission::where('concerned_party', $concerned)->where('label', $label)->first();
        $permissions = sprintf("%03d", decbin($permission));
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([

            'concerned_party' => 'required|string',
            'permission' => 'required|array',

        ]);

        $permissions = [];

        foreach ($request->permission as $key => $permission) {

            $permissions[] = $this->addPermissions($key, $request->concerned_party, $permission);
        }

        return generateResponse(201, PermissionResource::collection($permissions));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {

        $permissions = [];

        foreach (Permission::where('is_singular', false)->where('concerned_party', $id)->get() as $permission) {

            $permissions[$permission->label] = bindec($permission->delete . ' ' . $permission->write . ' ' . $permission->read);
        }

        return generateResponse(200, [
            'id' => (string)$id,
            'type' => 'UserPermissions',
            'attributes' => [
                ...$permissions,
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        $find = Permission::where('is_singular', false)->where('concerned_party', $id)->delete();

        if ($find) {

            return generateResponse(200);
        } else {

            return generateResponse(200, "{$id} does not have permissions in database");
        }
    }
}
