<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/about_us/our_history', function () {
    return Inertia::render('front-end/about_us/OurHistory');
})->name('our_history');
Route::get('/about_us/vision_mission_value', function () {
    return Inertia::render('front-end/about_us/VisionMissionValue');
})->name('vision_mission_value');
Route::get('/about_us/philosophy', function () {
    return Inertia::render('front-end/about_us/OurPhilosophy');
})->name('philosophy');

?>