<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\SiteInfoController;
use GuzzleHttp\Middleware;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('{category}/products', [ProductController::class, 'readByCategory']);
Route::get('products/{id}', [ProductController::class, 'readById']);
Route::get('products/featured/read', [ProductController::class, 'readFeatured']);
Route::get('category/read', [CategoryController::class, 'read']);
Route::get('category/featured/read', [CategoryController::class, 'readFeatured']);
Route::get('siteinfo/read', [SiteInfoController::class, 'read']);

Route::middleware(['auth:sanctum','authorizationAdmin'])->group(function () {
    Route::get('/authenticationCheck',function(){
        return response()->json(['message'=>'You are in','status'=>'200'],200);
    });
    Route::prefix('admin/category')->group(function () {
        Route::post('create', [CategoryController::class, 'create']);
        Route::get('read', [CategoryController::class, 'read']);
        Route::put('update/{id}', [CategoryController::class, 'update']);
        Route::delete('delete/{id}', [CategoryController::class, 'delete']);
    });
    Route::prefix('admin/user')->group(function () {
        Route::post('create', [UserController::class, 'create']);
        Route::get('read', [UserController::class, 'read']);
        Route::put('update/{id}', [UserController::class, 'update']);
        Route::delete('delete/{id}', [UserController::class, 'delete']);
    });
    Route::prefix('admin/product')->group(function () {
        Route::post('create', [ProductController::class, 'create']);
        Route::get('read', [ProductController::class, 'read']);
        Route::put('update/{id}', [ProductController::class, 'update']);
        Route::delete('delete/{id}', [ProductController::class, 'delete']);
    });
   
    Route::prefix('admin/siteinfo')->group(function () {
        Route::put('update', [SiteInfoController::class, 'update']);
    });
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::prefix('product/comment')->group(function () {
        Route::post('create', [CommentController::class, 'create']);
        Route::get('read/{id}', [CommentController::class, 'read']);
        Route::put('update/{id}', [CommentController::class, 'update']);
        Route::delete('delete/{id}', [CommentController::class, 'delete']);
    });
    Route::prefix('product/like')->group(function () {
        Route::post('create', [LikeController::class, 'create']);
        Route::get('read', [LikeController::class, 'read']);
        Route::get('read/{id}', [LikeController::class, 'readByProduct']);
        Route::put('update/{id}', [LikeController::class, 'update']);
        Route::delete('delete/{id}', [LikeController::class, 'delete']);
    });
    Route::prefix('user/like')->group(function () {
        Route::get('read', [LikeController::class, 'readByUser']);
        Route::delete('delete/{id}', [LikeController::class, 'delete']);
    });
    Route::prefix('user/profile')->group(function () {
        Route::get('read', [UserController::class, 'readByUser']);
        Route::put('update', [UserController::class, 'updateByUser']);
    });
    Route::prefix('product/rate')->group(function () {
        Route::post('create', [RateController::class, 'create']);
        Route::get('read', [RateController::class, 'read']);
        Route::get('read/{id}', [RateController::class, 'readByProduct']);
        Route::put('update/{id}', [RateController::class, 'update']);
        Route::delete('delete/{id}', [RateController::class, 'delete']);
    });
});



