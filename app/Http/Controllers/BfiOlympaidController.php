<?php

namespace App\Http\Controllers;

use App\Models\BfiOlympaid;
use Illuminate\Http\Request;

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
        //
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
