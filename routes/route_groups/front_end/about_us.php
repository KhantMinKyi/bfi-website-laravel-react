<?php

use App\Http\Controllers\GeneralPageRouteController;
use Illuminate\Support\Facades\Route;


Route::get('/about_us/our_history', [GeneralPageRouteController::class,'ourHistoryPage'])->name('our_history');
Route::get('/about_us/vision_mission_value', [GeneralPageRouteController::class,'ourVMVPage'])->name('vision_mission_value');
Route::get('/about_us/philosophy', [GeneralPageRouteController::class,'ourPhilosophyPage'])->name('philosophy');
Route::get('/about_us/community_service_activities', [GeneralPageRouteController::class,'ourCSAPage'])->name('community_service_activities');
// Route::inertia('/about_us/vision_mission_value', 'front-end/about_us/VisionMissionValue')->name('vision_mission_value');
// Route::inertia('/about_us/philosophy', 'front-end/about_us/OurPhilosophy')->name('philosophy');
Route::inertia('/about_us/leadership_teams', 'front-end/about_us/LeadershipTeams')->name('leadership_teams');
Route::inertia('/about_us/bfi_advantage', 'front-end/about_us/BFIAdvantage')->name('bfi_advantage');
// Route::inertia('/about_us/community_service_activities', 'front-end/about_us/CommunityServiceActivities')->name('community_service_activities');

?>