<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;


Route::prefix('v1')->group(function () {
    Route::prefix('auth')->controller(AuthenticationController::class)->group(function () {

        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::get('forgot-password-1', 'forgotPassword1');
        Route::get('forgot-password-2', 'forgotPassword2');

    });

    Route::apiResource('users', UserController::class);
    Route::apiResource('foods', FoodController::class);
});
