<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/admissions/apply_to_bfi_sister_schools', function () {
    return Inertia::render('front-end/admissions/ApplySisterSchool');
})->name('apply_to_bfi_sister_schools');
Route::get('/admissions/admission_policies', function () {
    return Inertia::render('front-end/admissions/AdmissionPolicies');
})->name('admission_policies');

?>