<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/bfi_olympiads/index', function () {
    return Inertia::render('front-end/bfi_olympiads/BFIOlympiads');
})->name('bfi_olympiads');
