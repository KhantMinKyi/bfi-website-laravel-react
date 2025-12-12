<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaqStoreRequest;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faqs = Faq::with('created_user')->orderBy('question', 'asc')->get();
        return response()->json([
            'message' => 'success',
            'data' => $faqs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaqStoreRequest $request)
    {
        $data = $request->validated();
        $user_id = Auth::user()->id;
        try {
            DB::beginTransaction();
            foreach ($data['faq'] as $faq) {
                $faq['created_user_id'] = $user_id;
                Faq::create($faq);
            }
            DB::commit();
            return back()->with('success', 'FAQ Created Successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
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
