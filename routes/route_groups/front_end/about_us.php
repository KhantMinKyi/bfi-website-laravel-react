<?php

use Illuminate\Support\Facades\Route;


Route::inertia('/about_us/our_history', 'front-end/about_us/OurHistory')->name('our_history');
Route::inertia('/about_us/vision_mission_value', 'front-end/about_us/VisionMissionValue')->name('vision_mission_value');
Route::inertia('/about_us/philosophy', 'front-end/about_us/OurPhilosophy')->name('philosophy');
Route::inertia('/about_us/leadership_teams', 'front-end/about_us/LeadershipTeams')->name('leadership_teams');
Route::inertia('/about_us/bfi_advantage', 'front-end/about_us/BFIAdvantage')->name('bfi_advantage');
Route::inertia('/about_us/community_service_activities', 'front-end/about_us/CommunityServiceActivities')->name('community_service_activities');

?>