<?php

use App\Http\Controllers\GeneralRouteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/competition/competition-data/{param}', [GeneralRouteController::class, 'getCompetitionPage'])->name('competition.data');
