<?php

use App\Http\Controllers\SisterSchoolController;
use Illuminate\Support\Facades\Route;

Route::inertia('/sister_schools/dashboard', 'backend/sister_schools/SisterSchoolsDashboard')->name('sister_schools.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/sister_schools/sister-schools', SisterSchoolController::class)->except('show');
    Route::put('/sister_schools/sister-schools/{sister_school}/banners', [SisterSchoolController::class, 'bannerUpdate']);
    Route::put('/sister_schools/sister-schools/{sister_school}/leaderships', [SisterSchoolController::class, 'leadershipUpdate']);
    Route::put('/sister_schools/sister-schools/{sister_school}/relatedCampuses', [SisterSchoolController::class, 'relatedCampusUpdate']);
});
