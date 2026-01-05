<?php

use App\Http\Controllers\GeneralRouteController;
use Illuminate\Support\Facades\Route;



Route::get('/curriculum/curriculum-data/{param}', [GeneralRouteController::class, 'getCurriculumPage'])->name('curriculum.data');
