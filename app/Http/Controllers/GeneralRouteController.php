<?php

namespace App\Http\Controllers;

use App\Models\CategoryTag;
use App\Models\Curriculum;
use App\Models\Faq;
use App\Models\Post;
use App\Models\SisterSchool;
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
        $sister_school = SisterSchool::with('banners', 'leaderships')->where('slug', $param)->firstOrFail();
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
        $sister_schools = SisterSchool::orderBy('name', 'desc')->get(['name', 'address', 'email', 'logo', 'website_url']);
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
    public function getCurriculumPage($param)
    {
        $curriculum = Curriculum::with('related_photos')->where('slug', $param)->firstOrFail();
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
}
