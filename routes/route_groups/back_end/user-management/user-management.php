<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/user-management/dashboard', function () {
    return Inertia::render('backend/user-management/UserManagement');
})->name('user-management.dashboard');

Route::prefix('api')->group(function () {
        Route::apiResource('/user-management/users', UserController::class);
        Route::post('/user-management/users/{user}/reset-password', [UserController::class,'resetPassword'])->name('users.reset_password');
});
?>