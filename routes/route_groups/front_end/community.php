<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/community/contact_us', function () {
    return Inertia::render('front-end/community/ContactUs');
})->name('contact_us');
Route::get('/community/faq', function () {
    return Inertia::render('front-end/community/FAQ');
})->name('faq');
Route::get('/community/news-and-events', function () {
    return Inertia::render('front-end/community/NewsEvent');
})->name('news_and_event');
?>