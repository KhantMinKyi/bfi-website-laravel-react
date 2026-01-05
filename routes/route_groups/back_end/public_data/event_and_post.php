
<?php

use App\Http\Controllers\CategoryTagController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostTypeController;
use Illuminate\Support\Facades\Route;

Route::inertia('/public_data/event_and_post/dashboard','backend/public_data/event_and_post/EventAndPostDashboard')->name('public_data.event_and_post.dashboard');


Route::inertia('/public_data/event_and_post/setting', 'backend/public_data/event_and_post/PostSetting')->name('public_data.event_and_post.setting');
Route::prefix('api')->group(function () {
    Route::apiResource('/public_data/event_and_post/post-type-settings', PostTypeController::class)->except('show');
    Route::apiResource('/public_data/event_and_post/category-tag-settings', CategoryTagController::class)->except('show');

    Route::apiResource('/public_data/event_and_post/posts', PostController::class);
    Route::post('/public_data/event_and_post/posts/{id}/change-status', [PostController::class, 'changeStatus']);
});
?>