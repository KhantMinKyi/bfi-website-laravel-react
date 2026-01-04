<?php

namespace App\Http\Controllers;

use App\Models\BfiOlympaid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BfiOlympaidController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bfi_olympaids = BfiOlympaid::with('created_user', 'updated_user')->get();
        return response()->json([
            'message' => 'success',
            'bfi_olympaids' => $bfi_olympaids
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $data = $request->validate(
        [
            'title'         =>'required|string',
            'information'   => 'required|string',
            'date'          =>'nullable|date'
        ]
        );
        $data['created_user_id'] =Auth::user()->id;
        BfiOlympaid::create($data);

        return back()->with('success', 'Olympiad created successfully!');
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
        $data = $request->validate(
            [
                'title'         =>'required|string',
                'information'   => 'required|string',
                'date'          =>'nullable|date'
            ]
            );
        $data['updated_user_id'] =Auth::user()->id;
        BfiOlympaid::findOrFail($id)->update($data);

        return back()->with('success', 'Olympiad updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        BfiOlympaid::findOrFail($id)->delete();

        return back()->with('success', 'Olympiad deleted successfully!');
    }
}
