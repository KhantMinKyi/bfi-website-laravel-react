<?php

use App\Http\Controllers\JobPostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/communications/jobs/dashboard', function () {
    return Inertia::render('backend/communications/Jobs');
})->name('communications.jobs.dashboard');

Route::prefix('api')->group(function () {
    Route::apiResource('/communications/jobs', JobPostController::class);
});
?>