
<?php

use App\Http\Controllers\CategoryTagController;
use App\Http\Controllers\PostTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/public_data/event_and_post/dashboard', function () {
    return Inertia::render('backend/public_data/event_and_post/EventAndPostDashboard');
})->name('public_data.event_and_post.dashboard');


Route::get('/public_data/event_and_post/setting', function () {
    return Inertia::render('backend/public_data/event_and_post/PostSetting');
})->name('public_data.event_and_post.setting');
Route::prefix('api')->group(function () {
    Route::apiResource('/public_data/event_and_post/post-type-settings', PostTypeController::class);
    Route::apiResource('/public_data/event_and_post/category-tag-settings', CategoryTagController::class);
});
?>