
<?php

use App\Http\Controllers\AlumniController;
use App\Http\Controllers\CompetitionController;
use Illuminate\Support\Facades\Route;


Route::inertia('/public_data/alumni/dashboard', 'backend/public_data/alumni/AlumniDashboard')->name('public_data.alumni.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/public_data/alumni', AlumniController::class)->except('show');
    Route::put('/public_data/alumni/{alumni}/photos', [AlumniController::class, 'photoUpdate']);
});
?>