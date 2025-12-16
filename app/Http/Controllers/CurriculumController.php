<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurriculumStoreRequest;
use App\Models\Curriculum;
use App\Models\CurriculumPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class CurriculumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $curricula = Curriculum::with('created_user', 'updated_user')->orderBy('name', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'curricula' => $curricula
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CurriculumStoreRequest $request)
    {
        $data = $request->validated();
        $data['created_user_id'] = Auth::user()->id;
        try {
            DB::beginTransaction();

            // create Logo 
            if (isset($data['logo'])) {
                $filePath = "img/curriculum_data/" . $data['slug'];
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['logo'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/curriculum_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/curriculum_" . $imageUid . "." . $extension);
                $data['logo'] = "/" . $photoName;
            }
            // create Logo Black
            if (isset($data['secondary_logo'])) {
                $filePath = "img/curriculum_data/" . $data['slug'];
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['secondary_logo'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/curriculum_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/curriculum_" . $imageUid . "." . $extension);
                $data['secondary_logo'] = "/" . $photoName;
            }
            // create post
            $curriculum = Curriculum::create($data);

            // Create Curriculum Photo
            $curricula = $data['curriculum_photo'] ?? [];
            if (!empty($curricula)) {
                $folderPath = "img/curriculum_data/" . $data['slug'] . "/curriculum";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }

                $savedCurricula = [];
                foreach ($curricula as $curriculum_photo) {
                    if (!empty($curriculum_photo['image'])) {
                        $file = $curriculum_photo['image'];
                        $fileName = "curriculum_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $curriculum_photo['image'] = "/" . $folderPath . "/" . $fileName;
                    }
                    $curriculum_photo['curriculum_id'] = $curriculum->id;
                    $curriculum_photo['created_user_id']  = $data['created_user_id'];
                    $savedCurricula[] = $curriculum_photo;
                }
                CurriculumPhoto::insert($savedCurricula);
            }
            DB::commit();

            return back()->with('success', 'Curriculum Created Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            // delete file if exists
            $filePath = "img/curriculum_data/" . $data['slug'];
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
