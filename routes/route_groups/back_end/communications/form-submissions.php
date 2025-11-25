<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/communications/form-submissions/dashboard', function () {
    return Inertia::render('backend/communications/FormSubmissions');
})->name('communications.form-submissions.dashboard');

?>