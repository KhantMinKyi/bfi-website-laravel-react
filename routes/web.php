<?php

use App\Http\Controllers\GeneralRouteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [function () {
    return Inertia::render('front-end/Welcome');
}])->name('home');
Route::get('/post/post-detail/{postId}', function ($postId) {
    return Inertia::render('front-end/PostDetail', [
        'postId' => $postId, // now this works
    ]);
})->name('post-detail');


require __DIR__ . '/route_groups/front_end/data_fetch.php';

require __DIR__ . '/route_groups/front_end/about_us.php';
require __DIR__ . '/route_groups/front_end/sister_schools.php';
require __DIR__ . '/route_groups/front_end/admissions.php';
require __DIR__ . '/route_groups/front_end/community.php';
require __DIR__ . '/route_groups/front_end/curriculum.php';
require __DIR__ . '/route_groups/front_end/competition.php';
require __DIR__ . '/route_groups/front_end/career.php';
require __DIR__ . '/route_groups/front_end/bfi_olympiads.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('backend/Index');
    })->name('dashboard');

    require __DIR__ . '/route_groups/back_end/user-management/user-management.php';
    require __DIR__ . '/route_groups/back_end/communications/form-submissions.php';
    require __DIR__ . '/route_groups/back_end/communications/jobs.php';

    require __DIR__ . '/route_groups/back_end/sister_schools/sister_schools.php';

    require __DIR__ . '/route_groups/back_end/public_data/event_and_post.php';
    require __DIR__ . '/route_groups/back_end/public_data/faq.php';
    require __DIR__ . '/route_groups/back_end/public_data/competitions.php';
    require __DIR__ . '/route_groups/back_end/public_data/bfi_olympiads.php';


    require __DIR__ . '/route_groups/back_end/education/education.php';


    require __DIR__ . '/route_groups/back_end/site_profile/about_bfi.php';
    require __DIR__ . '/route_groups/back_end/site_profile/cas.php';
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
