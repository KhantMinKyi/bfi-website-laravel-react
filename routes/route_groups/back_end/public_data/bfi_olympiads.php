
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/public_data/bfi_olympiads/dashboard', function () {
    return Inertia::render('backend/public_data/bfi_olympiads/BFIOlympiadsDashboard');
})->name('public_data.bfi_olympiads.dashboard');

?>