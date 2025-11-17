<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Riverside
Route::get('/sister_schools/skt_riverside', function () {
    $data = 'skt-rc';
    return Inertia::render('front-end/sister_schools/IndexPage',compact('data'));
})->name('skt_riverside');
Route::get('/sister_schools/skt_riverside_preschool', function () {
    $data = 'skt-rc-pre';
    return Inertia::render('front-end/sister_schools/IndexPage',compact('data'));
})->name('skt_riverside_preschool');

// City
Route::get('/sister_schools/skt_city', function () {
    $data = 'skt-cc';
    return Inertia::render('front-end/sister_schools/IndexPage',compact('data'));
})->name('skt_city');
Route::get('/sister_schools/skt_city_preschool', function () {
    $data = 'skt-cc-pre';
    return Inertia::render('front-end/sister_schools/IndexPage',compact('data'));
})->name('skt_city_preschool');

// Misa
Route::get('/sister_schools/misa', function () {
    $data = 'misa';
    return Inertia::render('front-end/sister_schools/IndexPage',compact('data'));
})->name('misa');
Route::get('/sister_schools/misa_preschool', function () {
    $data = 'misa-pre';
    return Inertia::render('front-end/sister_schools/IndexPage',compact('data'));
})->name('misa_preschool');

// Nisa
Route::get('/sister_schools/nisa', function () {
    $data = 'nisa';
    return Inertia::render('front-end/sister_schools/IndexPage',compact('data'));
})->name('nisa');
Route::get('/sister_schools/nisa_preschool', function () {
    $data = 'nisa-pre';
    return Inertia::render('front-end/sister_schools/IndexPage',compact('data'));
})->name('nisa_preschool');


// test
Route::get('/curriculum/curriculum', function () {
    return Inertia::render('front-end/sister_schools/IndexPage');
})->name('curriculum');

?>