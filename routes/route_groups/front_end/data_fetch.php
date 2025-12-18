<?php

// Fetching Data 

use App\Http\Controllers\GeneralRouteController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/home/get-post-data', [GeneralRouteController::class, 'getPostData']);
    Route::get('/home/get-category-tag-data', [GeneralRouteController::class, 'getCategoryTagData']);
    Route::get('/home/get-post-detail/{post}', [GeneralRouteController::class, 'getPostDetailData']);
    Route::get('/home/get-post-detail/{post}', [GeneralRouteController::class, 'getPostDetailData']);
    Route::get('/home/get-faq-data', [GeneralRouteController::class, 'getFaqData']);

    Route::get('/sister_schools/school-data/{slug}', [GeneralRouteController::class, 'getSisterSchoolData']);
    Route::get('/sister_schools/get-all-sister-school', [GeneralRouteController::class, 'getAllSisterSchool']);

    Route::get('/education/curriculum-data/{slug}', [GeneralRouteController::class, 'getCurriculumData']);
    Route::get('/education/get-all-curriculum', [GeneralRouteController::class, 'getAllCurriculum']);
    Route::get('/education/get-curriculum-photo/{slug}', [GeneralRouteController::class, 'getCurriculumPhotos']);


    Route::get('/competition/competition-data/{slug}', [GeneralRouteController::class, 'getCompetitionData']);
    Route::get('/competition/get-competition-photo/{slug}', [GeneralRouteController::class, 'getCompetitionPhotos']);
});
