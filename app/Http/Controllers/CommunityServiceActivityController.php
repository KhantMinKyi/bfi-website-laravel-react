<?php

namespace App\Http\Controllers;

use App\Http\Requests\CSAStoreRequest;
use App\Http\Requests\CSAUpdateRequest;
use App\Models\CommunityServiceActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class CommunityServiceActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $csas = CommunityServiceActivity::with('created_user', 'updated_user')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'csas' => $csas
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CSAStoreRequest $request)
    {
        $data = $request->validated();
        $data['created_user_id'] = Auth::user()->id;
        $data['is_donation'] = (bool) $data['is_donation'];

        try {
            DB::beginTransaction();

            // create banner 
            if (isset($data['image'])) {
                $filePath = "img/csa_data/" . $data['title'] . '_' . $data['date'];
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['image'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/csa_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/csa_" . $imageUid . "." . $extension);
                $data['image'] = "/" . $photoName;
            }
            // create post
            $csa = CommunityServiceActivity::create($data);

            DB::commit();

            return back()->with('success', 'CSA Created Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            // delete file if exists
            $filePath = "img/csa_data/" . $data['title'] . '_' . $data['date'];
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
    public function update(CSAUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        $data['updated_user_id'] = Auth::user()->id;
        $data['is_donation'] = (bool) $data['is_donation'];
        $csa = CommunityServiceActivity::findOrFail($id);
        try {
            DB::beginTransaction();
            if (isset($data['image'])) {
                if (File::exists(public_path($csa->image))) {
                    File::delete(public_path($csa->image));
                }
                $filePath = "img/csa_data/" . $data['title'] . '_' . $data['date'];
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['image'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/csa_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/csa_" . $imageUid . "." . $extension);
                $data['image'] = "/" . $photoName;
            }
            $csa->update($data);

            DB::commit();

            return back()->with('success', 'CSA Updates Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
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
        $csa = CommunityServiceActivity::findOrFail($id);
        try {
            DB::transaction(function () use ($csa) {

                $filePath = "img/csa_data/" . $csa->title . '_' . $csa->date;

                // Delete main record
                $csa->delete();

                // Delete Files
                if (File::exists($filePath)) {
                    File::deleteDirectory($filePath);
                }
            });
        } catch (\Exception $e) {

            throw ValidationException::withMessages([
                'title' => $e->getMessage()
            ]);
        }
    }
}
