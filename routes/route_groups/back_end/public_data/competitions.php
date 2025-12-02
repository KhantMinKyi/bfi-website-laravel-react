
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/public_data/competitions/dashboard', function () {
    return Inertia::render('backend/public_data/competitions/CompetitionsDashboard');
})->name('public_data.competitions.dashboard');

?>