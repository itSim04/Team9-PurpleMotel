<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StocksController;
use App\Http\Controllers\UserPermissions;
use App\Http\Controllers\UserPermissionsController;
use App\Http\Controllers\UserTypeController;
use App\Http\Controllers\UserTypePermissionController;
use App\Models\User;
use App\Models\UserType;
use App\Policies\UserPolicy;
use App\Policies\UserTypePolicy;
use App\Http\Controllers\BookingController;
use App\Models\Stocks;
use App\Policies\StocksPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
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
    Gate::policy(User::class, UserPolicy::class);
    Gate::policy(UserType::class, UserTypePolicy::class);
    Gate::policy(Stocks::class, StocksPolicy::class);

    Route::middleware('auth:api')->group(function () {

        Route::apiResource('foods', FoodController::class);
        Route::apiResource('rooms', RoomController::class);
        Route::apiResource('roomtypes', RoomTypeController::class);
        Route::apiResource('facilities', FacilityController::class);
        Route::apiResource('activities', ActivityController::class);
        Route::apiResource('bookings', BookingController::class);

        Route::prefix('stocks')->controller(StocksController::class)->group(function () {

            Route::get('', 'index')->middleware('can:viewAny,App\Stocks');
            Route::post('', 'store')->middleware('can:update,App\Stocks');
            Route::get('/{user}', 'show')->middleware('can:view,App\Stocks,stocks');
            Route::put('/{user}', 'update')->middleware('can:update,App\Stocks');
            Route::delete('/{user}', 'destroy')->middleware('can:delete,App\Stocks');

        });

        Route::prefix('users')->controller(UserController::class)->group(function () {

            Route::get('', 'index')->middleware('can:viewAny,App\User');
            Route::post('', 'store')->middleware('can:update,App\User');
            Route::get('/{user}', 'show')->middleware('can:view,App\User,user');
            Route::put('/{user}', 'update')->middleware('can:update,App\User');
            Route::delete('/{user}', 'destroy')->middleware('can:delete,App\User');

        });

        Route::prefix('user-types')->controller(UserTypeController::class)->group(function () {

            Route::get('', 'index')->middleware('can:viewAny,App\UserType');
            Route::post('', 'store')->middleware('can:update,App\UserType');
            Route::get('/{user_type}', 'show')->middleware('can:view,App\UserType,user_type');
            Route::put('/{user_type}', 'update')->middleware('can:update,App\UserType');
            Route::delete('/{user_type}', 'destroy')->middleware('can:delete,App\UserType');

        });

        Route::prefix('permissions')->group(function () {

            Route::get('', [PermissionController::class, 'index'])->middleware('can:viewAny,' . PermissionController::class);
            Route::post('', [PermissionController::class, 'store'])->middleware('can:update,' . PermissionController::class);
            Route::get('/{permission}', [PermissionController::class, 'show'])->middleware('can:view,permission');
            Route::put('/{permission}', [PermissionController::class, 'update'])->middleware('can:update,permission');
            Route::delete('/{permission}', [PermissionController::class, 'destroy'])->middleware('can:delete,permission');
        });
    });
});
