<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('status', 1)->orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'users' => $users
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // throw new Exception("Error Processing Request", 1);

        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'username'      => 'required|string|unique:users',
            'email'         => 'required|string|unique:users',
            'password'      => 'required',
            'gender'        => 'required|in:male,female',
            'avatar'        => 'nullable|string',
            'phone'         => 'required|string',
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
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'username'      => ['required', 'string', Rule::unique('users')->ignore($user->id),],
            'email'         => ['required', 'string', 'email', Rule::unique('users')->ignore($user->id),],
            'gender'        => 'required|in:male,female',
            'avatar'        => 'nullable|string',
            'phone'         => 'required|string',
        ]);
        $user->update($validated);
        return back()->with('success', 'User created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $user = User::findOrFail($id);
        $currentUser = Auth::user()->id;
        if ($currentUser === $user->id) {
            throw ValidationException::withMessages([
                'user' => ['You Cannot Delete Your Own Account in this Tab! ']
            ]);
        }
        $user->update([
            'status' => 0
        ]);
        return back()->with('success', 'User Deleted successfully.');
    }
    /**
     * Reset User Password.
     */
    public function resetPassword(Request $request, string $id)
    {

        $user = User::findOrFail($id);
        $validated = $request->validate([
            'password'          => 'required',
        ]);
        $newPassword = $validated['password'];
        // Check if new password is same as old password
        if (Hash::check($newPassword, $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['New password cannot be the same as the old password.'],
            ]);
        }
        // Save new password
        $user->password = Hash::make($newPassword);
        $user->save();

        return redirect()->back()->with('success', 'Password changed successfully!');
    }
}
