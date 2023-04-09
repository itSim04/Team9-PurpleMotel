<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
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

    Route::apiResource('users', UserController::class);
    Route::apiResource('rooms', RoomController::class);
    Route::apiResource('roomtypes', RoomTypeController::class);
    Route::apiResource('stocks', StocksController::class);
    Gate::policy(User::class, UserPolicy::class);
    Gate::policy(UserType::class, UserTypePolicy::class);

    Route::middleware('auth:api')->prefix('users')->controller(UserController::class)->group(function () {

        Route::get('', 'index')->middleware('can:viewAny,App\User');
        Route::post('', 'store')->middleware('can:create,App\User');
        Route::get('/{user}', 'show')->middleware('can:view,App\User,user');
        Route::put('/{user}', 'update')->middleware('can:update,App\User');
        Route::delete('/{user}', 'destroy')->middleware('can:delete,App\User');
        
    });

    Route::middleware('auth:api')->prefix('user-types')->controller(UserTypeController::class)->group(function () {

        Route::get('', 'index')->middleware('can:viewAny,App\UserType');
        Route::post('', 'store')->middleware('can:create,App\UserType');
        Route::get('/{user_type}', 'show')->middleware('can:view,App\UserType,user_type');
        Route::put('/{user_type}', 'update')->middleware('can:update,App\UserType');
        Route::delete('/{user_type}', 'destroy')->middleware('can:delete,App\UserType');
    });

    Route::prefix('permissions')->group(function () {
        Route::get('permissions', [PermissionController::class, 'index'])->middleware('can:viewAny,' . PermissionController::class);
        Route::post('permissions', [PermissionController::class, 'store'])->middleware('can:create,' . PermissionController::class);
        Route::get('permissions/{permission}', [PermissionController::class, 'show'])->middleware('can:view,permission');
        Route::put('permissions/{permission}', [PermissionController::class, 'update'])->middleware('can:update,permission');
        Route::delete('permissions/{permission}', [PermissionController::class, 'destroy'])->middleware('can:delete,permission');
    });

    Route::prefix('user-permissions')->group(function () {
        Route::get('user-permissions', [UserPermissionsController::class, 'index'])->middleware('can:viewAny,' . UserPermissionsController::class);
        Route::post('user-permissions', [UserPermissionsController::class, 'store'])->middleware('can:create,' . UserPermissionsController::class);
        Route::get('user-permissions/{user_permissions}', [UserPermissionsController::class, 'show'])->middleware('can:view,user_permissions');
        Route::put('user-permissions/{user_permissions}', [UserPermissionsController::class, 'update'])->middleware('can:update,user_permissions');
        Route::delete('user-permissions/{user_permissions}', [UserPermissionsController::class, 'destroy'])->middleware('can:delete,user_permissions');
    });

    Route::prefix('usertype-permissions')->group(function () {
        Route::get('', [UserTypePermissionController::class, 'index'])->middleware('can:viewAny,' . UserTypePermissionController::class);
        Route::post('usertype-permissions', [UserTypePermissionController::class, 'store'])->middleware('can:create,' . UserTypePermissionController::class);
        Route::get('/{usertype_permission}', [UserTypePermissionController::class, 'show']);
        Route::put('usertype-permissions/{usertype_permission}', [UserTypePermissionController::class, 'update'])->middleware('can:update,usertype_permission');
        Route::delete('usertype-permissions/{usertype_permission}', [UserTypePermissionController::class, 'destroy'])->middleware('can:delete,usertype_permission');
    });
    Route::apiResource('bookings', BookingController::class);
});
