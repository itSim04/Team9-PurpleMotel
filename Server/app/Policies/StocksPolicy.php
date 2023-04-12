<?php

namespace App\Policies;
use App\Models\User;

class UserTypePolicy
{

    private $permission_name = 'stock';

    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        if($user->tier == 2) {
            return true;
        }
        $permissions = extractPermissions($user->id, $user->type);
        if (!array_key_exists($this->permission_name, $permissions)) {

            return false;

        } else {

            return $permissions[$this->permission_name][0];

        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user_type
     * @return bool
     */
    public function view(User $user): bool
    {

        if($user->tier == 2) {
            return true;
        }
        $permissions = extractPermissions($user->id, $user->type);
        if (!array_key_exists($this->permission_name, $permissions)) {

            return false;

        } else {

            return $permissions[$this->permission_name][0];
            
        }
    }

    public function update(User $user) {

        if($user->tier == 2) {
            return true;
        }
        $permissions = extractPermissions($user->id, $user->type);
        if (!array_key_exists($this->permission_name, $permissions)) {

            return false;

        } else {

            return $permissions[$this->permission_name][1];
            
        }

    }

    public function delete(User $user) {

        if($user->tier == 2) {
            return true;
        }
        $permissions = extractPermissions($user->id, $user->type);
        if (!array_key_exists($this->permission_name, $permissions)) {

            return false;

        } else {

            return $permissions[$this->permission_name][2];
            
        }

    }
}
