<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\HomeSliderController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductReviewController;
use App\Http\Controllers\Admin\SubcategoryController;
use App\Http\Controllers\VisitorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [VisitorController::class, 'register']);
Route::post('login', [VisitorController::class,'login']);
Route::post('logout', [VisitorController::class,'logout']);
Route::post('me', [VisitorController::class,'me']);
Route::post('refresh', [VisitorController::class,'refresh']);

Route::get('/categories',[CategoryController::class, 'getCategory']);
Route::get('/categories/{id}',[CategoryController::class, 'showCategoryById']);

Route::get('/homesliders',[HomeSliderController::class,'getHomeslider']);
Route::get('/homesliders/{id}',[HomeSliderController::class, 'showHomesliderById']);

Route::get('/subcategories',[SubcategoryController::class, 'getSubcategory']);
Route::get('/subcategories/{id}',[SubcategoryController::class, 'showSubcategoryById']);

Route::get('/products',[ProductController::class, 'getProduct']);
Route::get('/products/{id}',[ProductController::class, 'showProductById']);

Route::get('/reviews',[ProductReviewController::class, 'getReview']);
Route::get('/reviews/{id}',[ProductReviewController::class, 'showReviewById']);
Route::get('/reviewses', [ProductReviewController::class, 'getReviewByVisitor']);
Route::post('/postreviews/{products_id}/{orders_id}', [ProductReviewController::class, 'store']);

Route::post('/productcarts/{products_id}' ,[ProductCartController::class, 'AddToCart']);
Route::get('/productcarts' ,[ProductCartController::class, 'getProductCart']);
Route::get('/productcarts/{id}' ,[ProductCartController::class, 'getProductCartById']);
Route::delete('/productcarts/remove/{id}', [ProductCartController::class, 'RemoveCartList']);
Route::put('/productcarts/plus/{id}', [ProductCartController::class, 'CartItemPlus']);
Route::put('/productcarts/minus/{id}', [ProductCartController::class, 'CartItemMinus']);

Route::post('/orders/{products_id}/{productcarts_id}', [OrderController::class, 'Order']);
Route::get('/orders', [OrderController::class, 'OrderListByVisitor']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
