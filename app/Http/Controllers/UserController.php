<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('status',1)->orderBy('created_at','desc')->get();
        return response()->json([
            'message'=>'success',
            'users'=>$users
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // throw new Exception("Error Processing Request", 1);
        
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'username'      =>'required|string|unique:users',
            'email'         =>'required|string|unique:users',
            'password'      =>'required',
            'gender'        => 'required|in:male,female',
            'avator'        =>'nullable|string',
            'phone'         =>'required|string',
        ]);
        User::create($validated);
        return back()->with('success', 'User created successfully.');
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
