<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/about_us/our_history', function () {
    return Inertia::render('front-end/about_us/OurHistory');
})->name('our_history');

?>