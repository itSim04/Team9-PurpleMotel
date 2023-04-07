<?php

namespace App\Policies;

use App\Models\UserType;
use Illuminate\Foundation\Auth\User;

class UserTypePolicy
{
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
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function viewAny(User $user)
    {
        $permissions = extractPermissions($user->id);
        if (!array_key_exists('user_type', $permissions)) {

            return false;

        } else {

            return $permissions['user_type'][0];

        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user_type
     * @param  string  $model
     * @return bool
     */
    public function view(User $user_type, string $model): bool
    {

        $permissions = extractPermissions($user_type->id);
        if (!array_key_exists('user_type', $permissions)) {

            return false;

        } else {

            return $permissions['user_type'][0];
            
        }
    }

    public function update(User $user) {

        $permissions = extractPermissions($user->id);
        if (!array_key_exists('user_type', $permissions)) {

            return false;

        } else {

            return $permissions['user_type'][1];
            
        }

    }

    public function delete(User $user) {

        $permissions = extractPermissions($user->id);
        if (!array_key_exists('user_type', $permissions)) {

            return false;

        } else {

            return $permissions['user_type'][2];
            
        }

    }
}
