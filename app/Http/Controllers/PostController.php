<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Models\Post;
use App\Models\PostCategoryTag;
use App\Models\PostType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('created_user', 'type', 'category_tags.category_tag')->where('status', 1)->get();
        // dd($posts);
        return response()->json([
            'message' => 'success',
            'posts' => $posts
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostStoreRequest $request)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $post_type = PostType::findOrFail($data['post_type_id']);
            $postUid = uniqid('', true);

            // create Banner image
            if (isset($data['banner_img'])) {
                $filePath = "img/post_data/" . $post_type->title . '/' . $postUid;
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['banner_img'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/post_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/post_" . $imageUid . "." . $extension);
                $data['banner_img'] = "/" . $photoName;
            }
            // create Sub Images 
            if (isset($data['images'])) {
                $images = '';
                foreach ($data['images'] as $data_image) {
                    $filePath = "img/post_data/" . $post_type->title . '/' . $postUid;
                    if (!File::exists($filePath)) {
                        $result = File::makeDirectory($filePath, 0755, true);
                    }
                    $photo = $data_image;
                    $extension = $photo->getClientOriginalExtension();
                    $imageUid = uniqid('', true);
                    $name = $photo->getClientOriginalName();
                    $singlePhotoName = $filePath . "/post_" . $imageUid . "." . $extension;
                    $photo->move($filePath, "/post_" . $imageUid . "." . $extension);
                    $imagePaths[] = $singlePhotoName;
                }
                $images = implode(',', $imagePaths);
                $data['images'] = $images;
            }
            $data['created_user_id'] = Auth::user()->id;

            // create post
            $post = Post::create($data);

            // create post category tags relationship
            $cate_arr = explode(',', $data['category_tag_ids']);
            foreach ($cate_arr as $cat_id) {
                $insertData[] = [
                    'post_id' => $post->id,
                    'category_tag_id' => $cat_id
                ];
            }

            // Single bulk insert query
            PostCategoryTag::insert($insertData);
            DB::commit();

            return back()->with('success', 'Post Created Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            // delete file if exists
            $filePath = "img/post_data/" . $post_type->title . '/' . $postUid;
            if (File::exists($filePath)) {
                File::deleteDirectory($filePath);
            }
            // Handle the error
            throw ValidationException::withMessages([
                'title' =>  $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
