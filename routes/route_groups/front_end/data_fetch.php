<?php

// Fetching Data 

use App\Http\Controllers\GeneralRouteController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/home/get-post-data', [GeneralRouteController::class, 'getPostData']);
    Route::get('/home/get-category-tag-data', [GeneralRouteController::class, 'getCategoryTagData']);
    Route::get('/home/get-post-detail/{post}', [GeneralRouteController::class, 'getPostDetailData']);
    Route::get('/home/get-post-detail/{post}', [GeneralRouteController::class, 'getPostDetailData']);
    Route::get('/home/get-faq-data', [GeneralRouteController::class, 'getFaqData']);
});
