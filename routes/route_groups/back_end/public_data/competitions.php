
<?php

use App\Http\Controllers\CompetitionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/public_data/competitions/dashboard', function () {
    return Inertia::render('backend/public_data/competitions/CompetitionsDashboard');
})->name('public_data.competitions.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/public_data/competitions', CompetitionController::class)->except('show');
    // Route::put('/public_data/competitions/{competition}/photos', [CompetitionController::class, 'photoUpdate']);
});
?>