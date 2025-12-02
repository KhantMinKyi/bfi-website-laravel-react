
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/public_data/faq/dashboard', function () {
    return Inertia::render('backend/public_data/faq/FAQDashboard');
})->name('public_data.faq.dashboard');

?>