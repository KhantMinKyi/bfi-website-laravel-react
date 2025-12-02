
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/public_data/event_and_post/dashboard', function () {
    return Inertia::render('backend/public_data/event_and_post/EventAndPostDashboard');
})->name('public_data.event_and_post.dashboard');

?>