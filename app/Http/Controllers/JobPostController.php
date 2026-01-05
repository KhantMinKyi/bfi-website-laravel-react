<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobPostStoreRequest;
use App\Http\Requests\JobPostStoreUpdateRequest;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $job_posts = JobPost::with('created_user')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'job_posts' => $job_posts
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobPostStoreUpdateRequest $request)
    {
        $data = $request->validated();
        $data['created_user_id'] = Auth::user()->id;

        // create job post
        JobPost::create($data);
        return back()->with('success', 'Job Post Created Successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('front-end/career/CareerJobDetail', [
            'id' => $id, // now this works
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobPostStoreUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        $job_post = JobPost::findOrFail($id);
        $data['updated_user_id'] = Auth::user()->id;
        $job_post->update($data);

        return back()->with('success', 'Job Post Updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $job_post = JobPost::findOrFail($id);
        $job_post->delete();

        return back()->with('success', 'Job Post deleted successfully.');
    }
}
