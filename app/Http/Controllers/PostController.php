<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
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
        $posts = Post::with('created_user', 'type', 'category_tags.category_tag')->get();
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
    public function update(PostUpdateRequest $request, string $id)
    {
        $data = $request->validated();

        $post = Post::with('type')->findOrFail($id);
        // Explode the path into parts
        $parts = explode('/', $post->banner_img);

        // Get the second-to-last part (the folder name)
        $folderName = $parts[count($parts) - 2];
        $postUid = $folderName;

        try {
            DB::beginTransaction();
            if (isset($data['banner_img'])) {
                if (File::exists(public_path($post->banner_img))) {
                    File::delete(public_path($post->banner_img));
                }
                $filePath = "img/post_data/" . $post->type->title . '/' . $postUid;
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

            if (isset($data['images'])) {
                $images = '';
                $old_post_images = explode(',', $post->images);
                foreach ($old_post_images as $opm) {
                    if (File::exists(public_path($opm))) {
                        File::delete(public_path($opm));
                    }
                }
                foreach ($data['images'] as $data_image) {

                    $filePath = "img/post_data/" . $post->type->title . '/' . $postUid;
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

            $data['updated_user_id'] = Auth::user()->id;

            // update post
            $post->update($data);

            // Delete all Post Type Relationship
            PostCategoryTag::where('post_id', $post->id)->delete();

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
            return back()->with('success', 'Post Updated Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            // delete file if exists
            $filePath = "img/post_data/" . $post->type->title . '/' . $postUid;
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Change post status (soft delete by setting status to 0)
     */
    public function changeStatus(Request $request, string $id)
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|integer|in:0,1',
        ]);

        $post->update([
            'status' => $validated['status'],
            'updated_user_id' => Auth::user()->id,
        ]);

        return back()->with('success', 'Post status updated successfully.');
    }
}
