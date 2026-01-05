
<?php

use App\Http\Controllers\CompetitionController;
use Illuminate\Support\Facades\Route;


Route::inertia('/public_data/competitions/dashboard', 'backend/public_data/competitions/CompetitionsDashboard')->name('public_data.competitions.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/public_data/competitions', CompetitionController::class)->except('show');
    Route::put('/public_data/competitions/{competition}/photos', [CompetitionController::class, 'photoUpdate']);
});
?>