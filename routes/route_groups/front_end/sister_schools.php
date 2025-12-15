<?php

use App\Http\Controllers\GeneralRouteController;
use App\Http\Controllers\SisterSchoolController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// test


Route::get('/sister_schools/school-data/{param}', [GeneralRouteController::class, 'getSisterSchoolPage'])->name('sister_school.data');
