<?php

use App\Http\Controllers\SisterSchoolController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/sister_schools/dashboard', function () {
    return Inertia::render('backend/sister_schools/SisterSchoolsDashboard');
})->name('sister_schools.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/sister_schools/sister-schools', SisterSchoolController::class);
    Route::put('/sister_schools/sister-schools/{sister_school}/banners', [SisterSchoolController::class, 'bannerUpdate']);
});
