<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
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
        if (!array_key_exists('user', $permissions)) {

            return false;

        } else {

            return $permissions['user'][0];

        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return bool
     */
    public function view(User $user, string $model): bool
    {
        if($user->id == $model) {

            return true;

        }

        $permissions = extractPermissions($user->id);
        if (!array_key_exists('user', $permissions)) {

            return false;

        } else {

            return $permissions['user'][0];
            
        }
    }

    public function update(User $user) {

        $permissions = extractPermissions($user->id);
        if (!array_key_exists('user', $permissions)) {

            return false;

        } else {

            return $permissions['user'][1];
            
        }

    }

    public function delete(User $user) {

        $permissions = extractPermissions($user->id);
        if (!array_key_exists('user', $permissions)) {

            return false;

        } else {

            return $permissions['user'][2];
            
        }

    }
}
