<?php

use App\Http\Controllers\JobPostController;
use Illuminate\Support\Facades\Route;

Route::inertia('/career/job-list','front-end/career/Career')->name('career');

Route::get('/career/job-detail/{id}', [JobPostController::class, 'show'])->name('career-job-detail');
