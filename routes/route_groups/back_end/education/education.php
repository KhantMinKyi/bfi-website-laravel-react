<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/education/dashboard', function () {
    return Inertia::render('backend/education/EducationDashboard');
})->name('education.dashboard');

?>