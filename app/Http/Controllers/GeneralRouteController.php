<?php

namespace App\Http\Controllers;

use App\Models\BfiOlympaid;
use App\Models\CategoryTag;
use App\Models\CommunityServiceActivity;
use App\Models\Competition;
use App\Models\Curriculum;
use App\Models\Faq;
use App\Models\JobPost;
use App\Models\Post;
use App\Models\SisterSchool;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class GeneralRouteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getPostData(Request $request)
    {

        $limit = request()->input('limit');
        $current_post = request()->input('current_post');
        $query = Post::with(['category_tags.category_tag'])->where('status', 1);
        if ($limit) {
            $query->limit($limit); // apply limit only if present
        }
        if ($current_post) {
            $query->whereNot('id', $current_post); // apply limit only if present
        }

        $posts = $query->orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'data' => $posts,
        ], 200);
    }
    public function getCategoryTagData()
    {
        $category_tag = CategoryTag::withCount('related_posts')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'data' => $category_tag,
        ], 200);
    }
    public function getPostDetailData($id)
    {
        $post = Post::with('category_tags.category_tag', 'type')->findOrFail($id);
        return response()->json([
            'message' => 'success',
            'data' => $post,
        ], 200);
    }
    public function getSisterSchoolPage($param)
    {
        return Inertia::render('front-end/sister_schools/IndexPage', [
            'data' => $param,
        ]);
    }
    public function getSisterSchoolData($slug)
    {
        $sister_school = SisterSchool::with('banners', 'leaderships')->where('slug', $slug)->firstOrFail();
        return response()->json([
            'message' => 'success',
            'data' => $sister_school,
            'banners' => $sister_school->banners,
        ], 200);
    }

    public function getFaqData()
    {
        $faqs = Faq::orderBy('question', 'asc')->get();
        return response()->json([
            'message' => 'success',
            'data' => $faqs
        ]);
    }
    public function getAllSisterSchool()
    {
        $sister_schools = SisterSchool::orderBy('name', 'desc')->get(['name', 'address', 'email', 'logo', 'website_url', 'phone']);
        return response()->json([
            'message' => 'success',
            'data' => $sister_schools,
        ], 200);
    }
    public function getCurriculumData($slug)
    {
        $curriculum = Curriculum::with('related_photos')->where('slug', $slug)->firstOrFail();
        return response()->json([
            'message' => 'success',
            'data' => $curriculum,
        ], 200);
    }
    public function getAllCurriculum()
    {
        $curriculums = Curriculum::with('related_photos')->get();
        return response()->json([
            'message' => 'success',
            'data' => $curriculums,
        ], 200);
    }
    public function getCurriculumPage($param)
    {
        return Inertia::render('front-end/curriculum/IndexPage', [
            'data' => $param,
        ]);
    }
    public function getCurriculumPhotos($slug)
    {
        $curriculum = Curriculum::with('related_photos')->where('slug', $slug)->firstOrFail();
        return response()->json([
            'message' => 'success',
            'data' => $curriculum->related_photos,
        ], 200);
    }
    public function getCompetitionPage($param)
    {
        return Inertia::render('front-end/competition/IndexPage', [
            'data' => $param,
        ]);
    }
    public function getCompetitionData($slug)
    {
        $competition = Competition::with('related_photos')->where('slug', $slug)->firstOrFail();
        return response()->json([
            'message' => 'success',
            'data' => $competition,
        ], 200);
    }
    public function getCompetitionPhotos($slug)
    {
        $competition = Competition::with('related_photos')->where('slug', $slug)->firstOrFail();
        return response()->json([
            'message' => 'success',
            'data' => $competition->related_photos,
        ], 200);
    }
    public function getJobPostData()
    {
        $job_posts = JobPost::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'data' => $job_posts,
        ], 200);
    }
    public function getJobPostDetail($id)
    {
        $job_post = JobPost::findOrFail($id);
        return response()->json([
            'message' => 'success',
            'data' => $job_post,
        ], 200);
    }
    public function getCSAData($param)
    {
        $csa = CommunityServiceActivity::where('is_donation', $param)->get();
        return response()->json([
            'message' => 'success',
            'data' => $csa,
        ], 200);
    }
    public function getBFIOlympiadsData()
    {
        $bfi_olympiads = BfiOlympaid::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'data' => $bfi_olympiads,
        ], 200);
    }
    public function getAdminDashboardData()
    {
        $data = [
            ['title' => 'Users', 'count' => User::count(), 'route' => '/user-management/dashboard'],
            ['title' => 'Posts', 'count' => Post::count(), 'route' => '/public_data/event_and_post/dashboard'],
            ['title' => 'Job Posts', 'count' => JobPost::count(), 'route' => '/communications/jobs/dashboard'],
            ['title' => 'Group of Schools', 'count' => SisterSchool::count(), 'route' => '/sister_schools/dashboard'],
        ];
        return response()->json([
            'message' => 'success',
            'data' => $data,
        ], 200);
    }
}
