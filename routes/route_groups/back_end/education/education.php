<?php

use App\Http\Controllers\CurriculumController;
use Illuminate\Support\Facades\Route;

Route::inertia('/education/dashboard','backend/education/EducationDashboard')->name('education.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/education/curriculum', CurriculumController::class)->except('show');
    Route::put('/education/curriculum/{sister_school}/photos', [CurriculumController::class, 'photoUpdate']);
});
