<?php

namespace App\Http\Controllers;

use App\Models\CategoryTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class CategoryTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category_tags = CategoryTag::with('created_user', 'updated_user')->get();
        return response()->json([
            'message' => 'success',
            'category_tags' => $category_tags
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'         => 'required',
            'type'          => 'required|in:category,tag',
        ]);
        $validated['created_user_id'] = Auth::user()->id;
        $existing_data = CategoryTag::where('title', $validated['title'])->where('status', 1)->first();
        if ($existing_data) {

            throw ValidationException::withMessages([
                'title' => ['Data Already Exist! ']
            ]);
        }
        // Check if soft-deleted (status = 0) entry exists
        $existing_deleted_data = CategoryTag::where('title', $validated['title'])->where('status', 0)->first();

        if ($existing_deleted_data) {
            // Restore by changing status to 1
            $existing_deleted_data->update(['status' => 1]);

            return back()->with('success', 'Setting Restore successfully!');
        } else {
            CategoryTag::create($validated);
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
        $category_tag = CategoryTag::findOrFail($id);
        $validated = $request->validate([
            'title'         => ['required', 'string', Rule::unique('category_tags')->ignore($category_tag->id),],
            'type'          => 'required'
        ]);
        $validated['updated_user_id'] = Auth::user()->id;
        $category_tag->update($validated);
        return back()->with('success', 'Setting Updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $category_tag = CategoryTag::findOrFail($id);
        $category_tag->update([
            'status' => 0
        ]);
        return back()->with('success', 'Setting Deleted successfully.');
    }
}
