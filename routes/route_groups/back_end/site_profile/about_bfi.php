
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/site_profile/about_bfi/dashboard', function () {
    return Inertia::render('backend/site_profile/about_bfi/AboutBFIDashboard');
})->name('site_profile.about_bfi.dashboard');

?>