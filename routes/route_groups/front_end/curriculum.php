<?php

use App\Http\Controllers\GeneralRouteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/curriculum/curriculum', function () {
    return Inertia::render('front-end/curriculum/IndexPage');
})->name('curriculum');
Route::get('/curriculum/preschool', function () {
    return Inertia::render('front-end/curriculum/PreSchool');
})->name('preschool');
Route::get('/curriculum/curriculum-data/{param}', [GeneralRouteController::class, 'getCurriculumPage'])->name('curriculum.data');
