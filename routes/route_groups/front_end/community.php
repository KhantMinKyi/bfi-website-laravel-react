<?php

use Illuminate\Support\Facades\Route;


Route::inertia('/community/contact_us', 'front-end/community/ContactUs')->name('contact_us');
Route::inertia('/community/faq', 'front-end/community/FAQ')->name('faq');
Route::inertia('/community/news-and-events','front-end/community/NewsEvent')->name('news_and_event');
?>