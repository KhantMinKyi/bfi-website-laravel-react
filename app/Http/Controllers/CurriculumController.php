<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurriculumPhotoUpdateRequest;
use App\Http\Requests\CurriculumStoreRequest;
use App\Http\Requests\CurriculumUpdateRequest;
use App\Models\Curriculum;
use App\Models\CurriculumPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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
        $curricula = Curriculum::with('related_photos', 'created_user', 'updated_user')->orderBy('name', 'desc')->get();
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
            Cache::forget('shared_curriculum');
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
    public function update(CurriculumUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        $data['updated_user_id'] = Auth::user()->id;
        $curriculum = Curriculum::findOrFail($id);
        try {
            DB::beginTransaction();
            if (isset($data['logo'])) {
                if (File::exists(public_path($curriculum->logo))) {
                    File::delete(public_path($curriculum->logo));
                }
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
            if (isset($data['secondary_logo'])) {
                if (File::exists(public_path($curriculum->secondary_logo))) {
                    File::delete(public_path($curriculum->secondary_logo));
                }
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
            $curriculum->update($data);

            DB::commit();
            Cache::forget('shared_curriculum');
            return back()->with('success', 'Curriculum Updates Successfully.');
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
        $curriculum = Curriculum::with('related_photos')->findOrFail($id);
        try {
            DB::transaction(function () use ($curriculum) {

                $filePath = "img/curriculum_data/" . $curriculum->slug;

                // Delete relations
                $curriculum->related_photos()->delete();

                // Delete main record
                $curriculum->delete();
                Cache::forget('shared_curriculum');
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
    /**
     * Undocumented function
     *
     * @param CurriculumPhotoUpdateRequest $request
     * @param string $id
     * @return void
     */
    public function photoUpdate(CurriculumPhotoUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $curriculum = Curriculum::findOrFail($id);
            // Create curriculum photo
            $photos = $data['curriculum_photo'] ?? [];

            // Delete Data
            $existingIds = CurriculumPhoto::where('curriculum_id', $id)
                ->pluck('id')
                ->toArray();

            $sentIds = collect($photos)
                ->pluck('id')
                ->filter() // remove null
                ->toArray();
            $idsToDelete = array_diff($existingIds, $sentIds);

            if (!empty($idsToDelete)) {
                $deletePhotos = CurriculumPhoto::whereIn('id', $idsToDelete)->get();

                foreach ($deletePhotos as $del) {
                    if (!empty($del->image) && File::exists(public_path($del->image))) {
                        File::delete(public_path($del->image));
                    }
                    $del->delete();
                }
            }

            if (!empty($photos)) {

                $folderPath = "img/curriculum_data/" . $curriculum->slug . "/curriculum";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }
                foreach ($photos as $key => $photo) {
                    $old_curriculum_photo = CurriculumPhoto::find($photo['id']);
                    if (!empty($photo['image'])) {
                        if (isset($old_curriculum_photo)) {
                            if (File::exists(public_path($old_curriculum_photo->image))) {
                                File::delete(public_path($old_curriculum_photo->image));
                            }
                        }
                        $file = $photo['image'];
                        $fileName = "curriculum_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $photo['image'] = "/" . $folderPath . "/" . $fileName;
                    } else {
                        unset($photo['image']); // prevent overwriting if no new file
                    }
                    $photo['updated_user_id']  = Auth::user()->id;
                    if (isset($old_curriculum_photo)) {
                        $old_curriculum_photo->update($photo);
                    } else {
                        unset($photo['id']);
                        $photo['created_user_id']  = Auth::user()->id;
                        $photo['curriculum_id']  = $id;
                        CurriculumPhoto::create($photo);
                    }
                }
            }
            DB::commit();
            Cache::forget('shared_curriculum');
            return back()->with('success', 'Curriculum Photo Updated Successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            // Handle the error
            throw ValidationException::withMessages([
                'title' =>  $e->getMessage()
            ]);
        }
    }
}
