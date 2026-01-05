
<?php

use App\Http\Controllers\BfiOlympaidController;
use Illuminate\Support\Facades\Route;


Route::inertia('/public_data/bfi_olympiads/dashboard', 'backend/public_data/bfi_olympiads/BFIOlympiadsDashboard')->name('public_data.bfi_olympiads.dashboard');
Route::prefix('api')->group(function () {
    Route::apiResource('/public_data/bfi_olympiads', BfiOlympaidController::class)->except('show');
});
?>