<?php

namespace App\Policies;

use App\Models\User;

class LikeNewsPolicy
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
     * @return mixed
     */
    public function viewAny(User $user)
    {
        echo $user;
        if ($user->tier == 2) {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user_type
     * @return bool
     */
    public function view(User $user, string $model): bool
    {

        echo $user . ' ' . $model;

        if ($user->tier == 2 || $user->id == $model) {
            return true;
        }
        return false;
    }

    public function update(User $user, string $model)
    {

        if ($user->tier == 2 || $user->id == $model) {
            return true;
        }
        return false;
    }

    public function delete(User $user, string $model)
    {

        if ($user->tier == 2 || $user->id == $model) {
            return true;
        }
        return false;
    }
}
