<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\NewsItemsController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\AboutUsContentsController;
use App\Http\Controllers\PartnersController;
use App\Http\Controllers\AboutUsDataController;
use App\Http\Controllers\HomeDataController;
use App\Http\Controllers\ServicesDataController;
use App\Http\Controllers\ServiceItemDataController;
use App\Http\Controllers\HomeCarouselSlidesController;
use App\Http\Controllers\LanguageSwitchController;
use App\Http\Controllers\NewsDataController;
use App\Http\Controllers\NewsItemDataController;
use App\Http\Controllers\BlogsDataController;
use App\Http\Controllers\BlogItemDataController;
use App\Http\Controllers\EmailSubscriptionsController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\MetaDescriptionsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);
    /*Route::group([
        'prefix' => 'password',
    ], function () {
        Route::post('create', [PasswordResetController::class, 'create']);
        Route::get('find/{token}', [PasswordResetController::class, 'find']);
        Route::post('reset', [PasswordResetController::class, 'reset']);
    });*/

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::resources([
        'services' => ServicesController::class,
        'news-items' => NewsItemsController::class,
        'partners' => PartnersController::class,
        'blogs' => BlogsController::class,
        'home-carousel-slides' => HomeCarouselSlidesController::class,
        'email-subscriptions' => EmailSubscriptionsController::class,
        'meta-descriptions' => MetaDescriptionsController::class,

        //--------------------------------Content CRUDs--------------------------------
        'about-us-contents' => AboutUsContentsController::class,
    ]);
});

Route::get('about-us-data/{locale?}', [AboutUsDataController::class, 'index']);
Route::get('home-data/{locale?}', [HomeDataController::class, 'index']);
Route::get('services-data/{locale?}', [ServicesDataController::class, 'index']);
Route::get('service-data/{slug}/{locale?}', [ServiceItemDataController::class, 'index']);
Route::get('language-change/{locale}', [LanguageSwitchController::class, 'index']);
Route::get('news-items-data/{locale?}', [NewsDataController::class, 'index']);
Route::get('news-item-data/{slug}/{locale?}', [NewsItemDataController::class, 'index']);
Route::get('blogs-data/{locale?}', [BlogsDataController::class, 'index']);
Route::get('blog-data/{slug}/{locale?}', [BlogItemDataController::class, 'index']);
Route::get('likes/{slug}/{action}', [BlogItemDataController::class, 'likes']);
Route::get('service-group-data/{slug}/{locale?}', [HomeDataController::class, 'get_item']);
Route::post('email-subscription-data', [EmailSubscriptionsController::class, 'save']);
Route::post('send-email', [ContactUsController::class, 'send']);
