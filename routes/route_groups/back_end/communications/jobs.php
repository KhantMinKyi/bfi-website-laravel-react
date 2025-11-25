<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/communications/jobs/dashboard', function () {
    return Inertia::render('backend/communications/Jobs');
})->name('communications.jobs.dashboard');

?>