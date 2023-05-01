<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AnnouncementsController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StocksController;
use App\Http\Controllers\UserPermissions;
use App\Http\Controllers\UserPermissionsController;
use App\Http\Controllers\UserTypeController;
use App\Http\Controllers\UserTypePermissionController;
use App\Http\Controllers\ImageController;
use App\Models\User;
use App\Models\UserType;
use App\Policies\UserPolicy;
use App\Policies\UserTypePolicy;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\FoodCategoryController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\IntelController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\LanguageListController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PromoCodeController;
use App\Models\Information;
use App\Models\LanguageList;
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
        Route::get('send-verify-email', 'sendVerifyEmail');
        Route::get('forgot-password-2', 'forgotPassword2');
        Route::get('verify-email', 'verifyEmail');
        Route::post('reset-password', 'resetPassword');
    });

    
    Gate::policy(User::class, UserPolicy::class);
    Gate::policy(UserType::class, UserTypePolicy::class);
    Gate::policy(Stocks::class, StocksPolicy::class);
    Gate::policy(Food::class, FoodPolicy::class);
    Gate::policy(Room::class, RoomPolicy::class);
    Gate::policy(Order::class, OrderPolicy::class);
    Gate::policy(Booking::class, BookingPolicy::class);
    Gate::policy(Registration::class, RegistrationPolicy::class);
    Gate::policy(PromoCode::class, PromoCodePolicy::class);



    
    Route::middleware('auth:api')->group(function () {
        
        Route::prefix('foods')->controller(FoodController::class)->group(function () {
            
            Route::get('', 'index');
            Route::get('/{user}', 'show');
        });
        Route::prefix('rooms')->controller(RoomController::class)->group(function () {
            Route::get('', 'index');
            Route::get('/{room}', 'show');
        });
        Route::get('information', [InformationController::class, 'getInformation']);
        Route::get('terms', [LanguageController::class, 'getTerms']);
        Route::post('recommend-room', [IntelController::class, 'recommendRoom']);
        
        Route::apiResource('announcements', AnnouncementsController::class);
        Route::prefix('announcements')->controller(AnnouncementsController::class)->group(function () {
    
            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
    
        });
        Route::apiResource('ingredients', IngredientController::class);
        Route::prefix('ingredients')->controller(IngredientController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
        });
        Route::apiResource('food-categories', FoodCategoryController::class);
        Route::prefix('food-categories')->controller(FoodCategoryController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
        });
        Route::apiResource('orders', OrderController::class);
        Route::prefix('orders')->controller(OrderController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
        });
        Route::apiResource('languages', LanguageController::class);
        Route::prefix('languages')->controller(LanguageController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
        });
        Route::apiResource('language-list', LanguageListController::class);
        Route::prefix('language-list')->controller(LanguageListController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
        });
        Route::apiResource('roomtypes', RoomTypeController::class);
        Route::prefix('roomtypes')->controller(RoomTypeController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
        });
        Route::apiResource('informations', InformationController::class);
        Route::prefix('informations')->controller(InformationController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
        });
        Route::apiResource('facilities', FacilityController::class);
        Route::prefix('facilities')->controller(FacilityController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'destroy');
        });
        Route::apiResource('activities', ActivityController::class);
        Route::prefix('activities')->controller(ActivityController::class)->group(function () {

            Route::post('', 'store')->middleware('can:view,App\Bookings,bookings');
            Route::put('/{user}', 'update')->middleware('can:update,App\Bookings');
            Route::delete('/{user}', 'destroy')->middleware('can:delete,App\Bookings');;
        });
        Route::apiResource('bookings', BookingController::class);
        Route::prefix('bookings')->controller(BookingController::class)->group(function () {

            Route::post('', 'store')->middleware('can:view,App\Bookings,bookings');
            Route::put('/{user}', 'update')->middleware('can:update,App\Bookings');
            Route::delete('/{user}', 'destroy')->middleware('can:delete,App\Bookings');;
        });
        Route::apiResource('registrations', RegistrationController::class);
        Route::prefix('registrations')->controller(RegistrationController::class)->group(function () {

            Route::post('', 'store')->middleware('can:view,App\Registrations,registrations');
            Route::put('/{user}', 'update')->middleware('can:update,App\Registrations');
            Route::delete('/{user}', 'destroy')->middleware('can:delete,App\Registrations');;
        });
        Route::apiResource('promocodes', PromoCodeController::class);
        Route::prefix('promocodes')->controller(PromoCodeController::class)->group(function () {

            Route::post('', 'store')->middleware('can:view,App\Promocodes,promocodes');
            Route::put('/{user}', 'update')->middleware('can:update,App\Promocodes');
            Route::delete('/{user}', 'destroy')->middleware('can:delete,App\Promocodes');;
        });

        Route::apiResource('intel', IntelController::class);

        Route::get('browse-images', [ImageController::class, 'browse']);
        Route::post('store-images', [ImageController::class, 'store']);
        Route::get('delete-images', [ImageController::class, 'destroy']);
        Route::post('modify-images', [ImageController::class, 'update']);



        Route::controller(PromoCodeController::class)->group(function () {

            Route::get('full-promocodes', 'full_index');
            Route::get('applyPromo/{id}', 'applyPromo');
            Route::get('appliedCodes/{id}', 'isAlreadyApplied');
        });

        Route::controller(NewsController::class)->group(function () {

            Route::get('like', 'like');
            Route::get('unlike',  'unlike');
            Route::get('isLiked', 'isLiked');
        });

        Route::controller(RoomController::class)->group(function () {

            Route::post('filter', [RoomController::class, 'filter']);;
            Route::get('room_bookings', [RoomController::class, 'roomBookings']);
            Route::post('postReview', 'postReview');
        });

        Route::prefix('rooms')->controller(RoomController::class)->group(function () {

            Route::post('', 'store')->middleware('can:view,App\Rooms,rooms');
            Route::put('/{user}', 'update')->middleware('can:update,App\Rooms');
            Route::delete('/{user}', 'destroy')->middleware('can:delete,App\Rooms');
        });

        Route::prefix('foods')->controller(FoodController::class)->group(function () {

            Route::get('/{user}', 'show')->middleware('can:view,App\Foods,foods');
            Route::put('/{user}', 'update')->middleware('can:update,App\Foods');
            Route::delete('/{user}', 'destroy')->middleware('can:delete,App\Foods');
        });

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
            Route::put('/{user}', 'update')->middleware('can:update,App\User,user');
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
    Route::apiResource('news', NewsController::class);
    Route::apiResource('images', ImageController::class);
    Route::get('fetch-profile', [UserController::class, 'fetchProfile']);
});
