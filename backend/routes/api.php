<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomAreaController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\CouponController;

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

Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::middleware('assign.guard:users')->post('user', 'login');
    Route::middleware('assign.guard:admins')->post('admin', 'login');

    Route::middleware('assign.guard:users')->get('user', 'me');
    Route::middleware('assign.guard:admins')->get('admin', 'me');
});

Route::prefix('templates')->controller(TemplateController::class)->group(function () {
    Route::get('/', 'getAll');
    Route::post('/', 'save');
    Route::put('/{id}', 'update');
});

Route::prefix('budgets')->controller(BudgetController::class)->group(function () {
    Route::get('/', 'getAll');
    Route::get('/users', 'users');

    Route::post('/', 'save');
});

Route::prefix('cart')->controller(CartController::class)->group(function () {
    Route::get('/', 'getAll');
    Route::post('/', 'saveItem');
    Route::put('/', 'updateMultipleItems');
    Route::delete('/{id}', 'deleteItem');
});

Route::prefix('custom_areas')->controller(CustomAreaController::class)->group(function () {
    Route::get('/', 'getAll');
    Route::get('/{id}', 'get');
});

Route::prefix('contacts')->controller(ContactController::class)->group(function () {
    Route::get('/', 'getAll');
    Route::post('/', 'save');
    Route::put('/{id}', 'update');
});

Route::prefix('members')->controller(MemberController::class)->group(function () {
    Route::get('/{id}/budgets', 'budgetsFromMember');
});

Route::prefix('coupons')->controller(CouponController::class)->group(function () {
    Route::get('/', 'getAll');
    Route::middleware(['auth:admins'])->post('/', 'save');
    Route::middleware(['auth:admins'])->delete('/{id}', 'delete');
});