<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/about_us/contact_us', function () {
    return Inertia::render('front-end/ContactUs');
})->name('contact_us');

?>