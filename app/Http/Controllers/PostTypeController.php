<?php

namespace App\Http\Controllers;

use App\Models\PostType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class PostTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post_types = PostType::where('status', 1)->get();
        return response()->json([
            'message' => 'success',
            'post_types' => $post_types
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'is_activity' => 'required|boolean',
        ]);
        $existing_data = PostType::where('title', $validated['title'])->where('status', 1)->first();
        if ($existing_data) {

            throw ValidationException::withMessages([
                'title' => ['Data Already Exist! ']
            ]);
        }
        // Check if soft-deleted (status = 0) entry exists
        $existing_deleted_data = PostType::where('title', $validated['title'])->where('status', 0)->first();

        if ($existing_deleted_data) {
            // Restore by changing status to 1
            $existing_deleted_data->update(['status' => 1]);

            return back()->with('success', 'Setting Restore successfully!');
        } else {
            PostType::create($validated);
            return back()->with('success', 'Setting created successfully!');
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
        $post_type = PostType::findOrFail($id);
        $validated = $request->validate([
            'title'      => ['required', 'string', Rule::unique('post_types')->ignore($post_type->id),],
            'is_activity' => 'required|boolean',
        ]);
        $post_type->update($validated);
        return back()->with('success', 'Setting Updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $post_type = PostType::findOrFail($id);
        $post_type->update([
            'status' => 0
        ]);
        return back()->with('success', 'Setting Deleted successfully.');
    }
}
