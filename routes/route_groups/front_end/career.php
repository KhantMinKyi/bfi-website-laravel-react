<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/career/job-list', function () {
    return Inertia::render('front-end/career/Career');
})->name('career');
// Route::get('/career/job-detail/{id}', function () {
//     return Inertia::render('front-end/career/CareerJobDetail');
// })->name('career-job-detail');
Route::get('/career/job-detail/{id}', function ($id) {
    return Inertia::render('front-end/career/CareerJobDetail', [
        'id' => $id, // now this works
    ]);
})->name('career-job-detail');
