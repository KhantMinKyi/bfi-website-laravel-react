<?php

use App\Http\Controllers\GeneralRouteController;
use App\Http\Controllers\SisterSchoolController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// test
Route::get('/curriculum/curriculum', function () {
    return Inertia::render('front-end/sister_schools/IndexPage');
})->name('curriculum');

Route::get('/sister_schools/school-data/{param}', [GeneralRouteController::class, 'getSisterSchoolPage'])->name('sister_school.data');
Route::prefix('api')->group(function () {
    Route::get('/sister_schools/school-data/{slug}', [GeneralRouteController::class, 'getSisterSchoolData']);
    Route::get('/sister_schools/get-all-sister-school', [GeneralRouteController::class, 'getAllSisterSchool']);
});
