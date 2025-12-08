<?php

namespace App\Http\Controllers;

use App\Models\CategoryTag;
use App\Models\Post;
use Illuminate\Http\Request;
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
}
