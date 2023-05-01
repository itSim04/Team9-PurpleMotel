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
use App\Models\Booking;
use App\Models\Information;
use App\Models\LanguageList;
use App\Models\LikesNews;
use App\Models\Stocks;
use App\Policies\LikeNewsPolicy;
use App\Policies\NewsPolicy;
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
    Gate::policy(Announcements::class, AnnouncementsPolicy::class);
    Gate::policy(Information::class, InformationPolicy::class);
    Gate::policy(LanguageList::class, LanguageListPolicy::class);
    Gate::policy(Ingredient::class, IngredientPolicy::class);
    Gate::policy(FoodCategory::class, FoodCategoryPolicy::class);
    Gate::policy(Language::class, LanguagePolicy::class);
    Gate::policy(RoomType::class, RoomTypePolicy::class);
    Gate::policy(Facility::class, FacilityPolicy::class);
    Gate::policy(Activity::class, ActivityPolicy::class);
    Gate::policy(LikesNews::class, LikeNewsPolicy::class);
    Gate::policy(News::class, NewsPolicy::class);




    Route::prefix('foods')->controller(FoodController::class)->group(function () {

        Route::get('', 'index');
        Route::get('/{user}', 'show');
    });
    Route::prefix('rooms')->controller(RoomController::class)->group(function () {
        Route::get('', 'index');
        Route::get('/{room}', 'show');
    });
    Route::prefix('food-categories')->controller(FoodCategoryController::class)->group(function () {

        Route::get('', 'index');
        Route::get('/{user}', 'show');
    });
    Route::prefix('roomtypes')->controller(RoomTypeController::class)->group(function () {

        Route::get('', 'index');
        Route::get('/{user}', 'show');
    });
    Route::prefix('languages')->controller(LanguageController::class)->group(function () {

        Route::get('', 'index');
        Route::get('/{user}', 'show');
    });
    Route::prefix('language-list')->controller(LanguageListController::class)->group(function () {

        Route::get('', 'index');
        Route::get('/{user}', 'show');
    });
    Route::prefix('activities')->controller(ActivityController::class)->group(function () {
        
        Route::get('', 'index');
        Route::get('/{user}', 'show');
    });
    Route::prefix('informations')->controller(InformationController::class)->group(function () {
        
        Route::get('', 'index');
        Route::get('/{user}', 'show');
    });
    Route::get('information', [InformationController::class, 'getInformation']);
    Route::get('terms', [LanguageController::class, 'getTerms']);
    Route::get('browse-images', [ImageController::class, 'browse']);

    Route::middleware('auth:api')->group(function () {


        Route::post('recommend-room', [IntelController::class, 'recommendRoom']);

        Route::prefix('announcements')->controller(AnnouncementsController::class)->group(function () {

            Route::get('', 'index');
            Route::get('/{user}', 'show');
        });
        Route::prefix('announcements')->controller(AnnouncementsController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Announcements');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Announcements');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Announcements');
        });

        Route::prefix('ingredients')->controller(IngredientController::class)->group(function () {

            Route::get('', 'index');
            Route::get('/{user}', 'show');
        });
        Route::prefix('ingredients')->controller(IngredientController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Ingredients');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Ingredients');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Ingredients');
        });

        Route::prefix('food-categories')->controller(FoodCategoryController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\FoodCategories');
            Route::put('/{user}', 'update');//->middleware('can:update,App\FoodCategories');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\FoodCategories');
        });

        Route::prefix('orders')->controller(OrderController::class)->group(function () {

            Route::get('', 'index');
            Route::get('/{user}', 'show');
        });
        Route::prefix('orders')->controller(OrderController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Orders');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Orders');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Orders');
        });

        Route::prefix('languages')->controller(LanguageController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Languages');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Languages');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Languages');
        });

        Route::prefix('language-list')->controller(LanguageListController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\LanguageList');
            Route::put('/{user}', 'update');//->middleware('can:update,App\LanguageList');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\LanguageList');
        });

        Route::prefix('roomtypes')->controller(RoomTypeController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\RoomTypes');
            Route::put('/{user}', 'update');//->middleware('can:update,App\RoomTypes');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\RoomTypes');
        });

        Route::prefix('informations')->controller(InformationController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Informations');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Informations');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Informations');
        });

        Route::prefix('facilities')->controller(FacilityController::class)->group(function () {

            Route::get('', 'index');
            Route::get('/{user}', 'show');
        });
        Route::prefix('facilities')->controller(FacilityController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Booking,booking');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Bookings');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Bookings');
        });

        Route::prefix('activities')->controller(ActivityController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Activities');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Activities');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Activities');;
        });

        Route::prefix('bookings')->controller(BookingController::class)->group(function () {

            Route::get('', 'index');
            Route::get('/{user}', 'show');
        });
        Route::prefix('bookings')->controller(BookingController::class)->group(function () {

            Route::post('', 'store');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Bookings');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Bookings');;
        });

        Route::prefix('registrations')->controller(RegistrationController::class)->group(function () {

            Route::get('', 'index');
            Route::get('/{user}', 'show');
        });
        Route::prefix('registrations')->controller(RegistrationController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Registrations');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Registrations');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Registrations');;
        });
        Route::prefix('promocodes')->controller(PromoCodeController::class)->group(function () {

            Route::get('', 'index');
            Route::get('/{user}', 'show');
        });
        Route::prefix('promocodes')->controller(PromoCodeController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:update,App\Promocodes');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Promocodes');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Promocodes');;
        });

        Route::apiResource('intel', IntelController::class);

        Route::post('store-images', [ImageController::class, 'store']);
        Route::get('delete-images', [ImageController::class, 'destroy']);
        Route::post('modify-images', [ImageController::class, 'update']);



        Route::controller(PromoCodeController::class)->group(function () {

            Route::get('full-promocodes', 'full_index');//->middleware('can:view,App\PromoCodes,promocodes');
            Route::get('applyPromo/{id}', 'applyPromo');
            Route::get('appliedCodes/{id}', 'isAlreadyApplied');//->middleware('can:view,App\PromoCodes,promocodes');
        });

        Route::controller(NewsController::class)->group(function () {

            Route::get('like', 'like');//->middleware('can:update,App\News,news');
            Route::get('unlike', 'unlike');//->middleware('can:update,App\News,news');
            Route::get('isLiked', 'isLiked');//->middleware('can:update,App\News,news');
        });

        Route::controller(RoomController::class)->group(function () {

            Route::post('filter', [RoomController::class, 'filter']);;
            Route::get('room_bookings', [RoomController::class, 'roomBookings']);
            Route::post('postReview', 'postReview');
        });

        Route::prefix('rooms')->controller(RoomController::class)->group(function () {

            Route::post('', 'store');//->middleware('can:view,App\Rooms,rooms');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Rooms');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Rooms');
        });

        Route::prefix('foods')->controller(FoodController::class)->group(function () {

            Route::get('/{user}', 'show');//->middleware('can:view,App\Foods,foods');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Foods');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Foods');
        });

        Route::prefix('stocks')->controller(StocksController::class)->group(function () {

            Route::get('', 'index');//->middleware('can:viewAny,App\Stocks');
            Route::post('', 'store');//->middleware('can:update,App\Stocks');
            Route::get('/{user}', 'show');//->middleware('can:view,App\Stocks,stocks');
            Route::put('/{user}', 'update');//->middleware('can:update,App\Stocks');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\Stocks');
        });

        Route::prefix('users')->controller(UserController::class)->group(function () {

            Route::get('', 'index');//->middleware('can:viewAny,App\User');
            Route::post('', 'store');//->middleware('can:update,App\User');
            Route::get('/{user}', 'show');//->middleware('can:view,App\User,user');
            Route::put('/{user}', 'update');//->middleware('can:update,App\User,user');
            Route::delete('/{user}', 'destroy');//->middleware('can:delete,App\User');
        });

        Route::prefix('user-types')->controller(UserTypeController::class)->group(function () {

            Route::get('', 'index');//->middleware('can:viewAny,App\UserType');
            Route::post('', 'store');//->middleware('can:update,App\UserType');
            Route::get('/{user_type}', 'show');//->middleware('can:view,App\UserType,user_type');
            Route::put('/{user_type}', 'update');//->middleware('can:update,App\UserType');
            Route::delete('/{user_type}', 'destroy');//->middleware('can:delete,App\UserType');
        });

        Route::prefix('permissions')->group(function () {

            Route::get('', [PermissionController::class, 'index']);//->middleware('can:viewAny,' . PermissionController::class);
            Route::post('', [PermissionController::class, 'store']);//->middleware('can:update,' . PermissionController::class);
            Route::get('/{permission}', [PermissionController::class, 'show']);//->middleware('can:view,permission');
            Route::put('/{permission}', [PermissionController::class, 'update']);//->middleware('can:update,permission');
            Route::delete('/{permission}', [PermissionController::class, 'destroy']);//->middleware('can:delete,permission');
        });
    });
    Route::apiResource('news', NewsController::class);
    Route::apiResource('images', ImageController::class);
    Route::get('fetch-profile', [UserController::class, 'fetchProfile']);
});
