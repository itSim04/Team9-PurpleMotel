<?php

namespace App\Policies;

use App\Models\Stocks;
use App\Models\User;

class StocksPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine whether the stocks can view the model.
     *
     * @param  \App\Models\User  $stocks
     * @return mixed
     */
    public function viewAny(User $stocks)
    {

        if ($stocks->tier == 2) {
            return true;
        }
        $permissions = extractPermissions($stocks->id, $stocks->type);
        if (!array_key_exists('stock', $permissions)) {

            return false;
        } else {

            return $permissions['stock'][0];
        }
    }

    /**
     * Determine whether the stocks can view the model.
     *
     * @param  \App\Models\User  $stocks
     * @param  string  $model
     * @return bool
     */
    public function view(User $stocks, string $model): bool
    {
        if ($stocks->tier == 2) {

            return true;
        }

        $permissions = extractPermissions($stocks->id, $stocks->type);
        if (!array_key_exists('stock', $permissions)) {

            return false;
        } else {

            return $permissions['stock'][0];
        }
    }

    public function update(User $stocks)
    {

        if ($stocks->tier == 2) {
            return true;
        }
        $permissions = extractPermissions($stocks->id, $stocks->type);
        if (!array_key_exists('stock', $permissions)) {

            return false;
        } else {

            return $permissions['stock'][1];
        }
    }

    public function delete(User $stocks)
    {

        if ($stocks->tier == 2) {
            return true;
        }
        $permissions = extractPermissions($stocks->id, $stocks->type);
        if (!array_key_exists('stock', $permissions)) {

            return false;
        } else {

            return $permissions['stock'][2];
        }
    }
}
