<?php
use Illuminate\Support\Facades\Route;


Route::inertia('/admissions/apply_to_bfi_sister_schools', 'front-end/admissions/ApplySisterSchool')->name('apply_to_bfi_sister_schools');
Route::inertia('/admissions/admission_policies', 'front-end/admissions/AdmissionPolicies')->name('admission_policies');

?>