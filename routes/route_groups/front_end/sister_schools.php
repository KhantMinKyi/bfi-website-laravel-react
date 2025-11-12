<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/sister_schools/skt_riverside', function () {
    return Inertia::render('front-end/sister_schools/SktRiverside');
})->name('skt_riverside');


// test
Route::get('/curriculum/curriculum', function () {
    return Inertia::render('front-end/sister_schools/SktRiverside');
})->name('curriculum');

?>