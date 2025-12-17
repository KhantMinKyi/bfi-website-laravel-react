<?php

use App\Http\Controllers\GeneralRouteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/curriculum/curriculum-data/{param}', [GeneralRouteController::class, 'getCurriculumPage'])->name('curriculum.data');
