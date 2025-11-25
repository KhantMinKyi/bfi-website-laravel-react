<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('front-end/Welcome');
})->name('home');

require __DIR__ . '/route_groups/front_end/about_us.php';
require __DIR__ . '/route_groups/front_end/sister_schools.php';
require __DIR__ . '/route_groups/front_end/admissions.php';
require __DIR__ . '/route_groups/front_end/contact_us.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('back-end/Index');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
