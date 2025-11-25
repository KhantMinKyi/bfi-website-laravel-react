<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/user-management/dashboard', function () {
    return Inertia::render('backend/user-management/UserManagement');
})->name('user-management.dashboard');

?>