
<?php

use App\Http\Controllers\CommunityServiceActivityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/site_profile/csa/dashboard', function () {
    return Inertia::render('backend/site_profile/csa/CSADashboard');
})->name('site_profile.csa.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/site_profile/csa', CommunityServiceActivityController::class)->except('show');
});
?>