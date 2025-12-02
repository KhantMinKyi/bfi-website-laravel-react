<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/sister_schools/dashboard', function () {
    return Inertia::render('backend/sister_schools/SisterSchoolsDashboard');
})->name('sister_schools.dashboard');

?>