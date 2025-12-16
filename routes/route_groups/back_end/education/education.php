<?php

use App\Http\Controllers\CurriculumController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/education/dashboard', function () {
    return Inertia::render('backend/education/EducationDashboard');
})->name('education.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/education/curriculum', CurriculumController::class)->except('show');
});
