<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\HomeSliderController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductReviewController;
use App\Http\Controllers\Admin\SubcategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [LoginController::class, 'login'])->name('login');
// Route::group(['middleware' => ['role:admin']], function (){
Route::post('actionlogin', [LoginController::class, 'actionlogin'])->name('actionlogin');
Route::get('actionlogout', [LoginController::class, 'actionlogout'])->name('actionlogout')->middleware('auth');


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('admin.index');
    })->name('dashboard');
});

// ========= All Admin ROUTES =========
Route::prefix('admin')->group(function () {
    Route::get('/user/profile', [AdminController::class, 'UserProfile'])->name('user.profile');
    Route::post('/user/profile/store', [AdminController::class, 'UserProfileStore'])->name('user.profile.store');
    Route::get('/change/password', [AdminController::class, 'ChangePassword'])->name('change.password');
    Route::post('/change/password/update', [AdminController::class, 'ChangePasswordUpdate'])->name('change.password.update');
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth'], 'as' => 'admin.'], function(){
   Route::resource('homesliders', HomeSliderController::class);
   Route::put('homesliders/{id}/toggleActive',[HomeSliderController::class, 'toggleStatus'])->name('homesliders.toggleStatus');

   Route::resource('categories', CategoryController::class);
   Route::put('categories/{id}/toggleActive',[CategoryController::class, 'toggleStatus'])->name('categories.toggleStatus');

   Route::resource('subcategories', SubcategoryController::class);
   Route::put('subcategories/{id}/toggleActive',[SubcategoryController::class, 'toggleStatus'])->name('subcategories.toggleStatus');

   Route::resource('products', ProductController::class);
   Route::put('products/{id}/toggleActive',[ProductController::class, 'toggleStatus'])->name('products.toggleStatus');

   Route::resource('reviews', ProductReviewController::class);
   Route::put('reviews/{id}/toggleActive',[ProductReviewController::class, 'toggleStatus'])->name('reviews.toggleStatus');

   Route::get('/order/details/{id}', [OrderController::class, 'OrderDetails'])->name('order.details');
   Route::get('/pending/order', [OrderController::class, 'PendingOrder'])->name('pending.order');
   Route::get('/processing/order', [OrderController::class, 'ProcessingOrder'])->name('processing.order');
   Route::get('/completed/order', [OrderController::class, 'CompletedOrder'])->name('completed.order');
   Route::get('/status/processing/{id}', [OrderController::class, 'PendingToProcessing'])->name('pending.processing');
   Route::get('/status/completed/{id}', [OrderController::class, 'ProcessingToCompleted'])->name('processing.completed');
   Route::get('/delete/{id}', [OrderController::class, 'DeleteOrder'])->name('delete.order');

});


