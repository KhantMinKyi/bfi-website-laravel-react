
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/site_profile/cas/dashboard', function () {
    return Inertia::render('backend/site_profile/cas/CASDashboard');
})->name('site_profile.cas.dashboard');

?>