
<?php

use App\Http\Controllers\FaqController;
use Illuminate\Support\Facades\Route;

Route::inertia('/public_data/faq/dashboard', 'backend/public_data/faq/FAQDashboard')->name('public_data.faq.dashboard');

Route::prefix('api')->group(function () {
    Route::apiResource('/faq/faqs', FaqController::class)->except('show');
});
?>