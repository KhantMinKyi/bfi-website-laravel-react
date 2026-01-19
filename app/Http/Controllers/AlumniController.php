<?php

namespace App\Http\Controllers;

use App\Http\Requests\AlumniPhotoUpdateRequest;
use App\Http\Requests\AlumniStoreRequest;
use App\Http\Requests\AlumniUpdateRequest;
use App\Models\Alumni;
use App\Models\AlumniPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class AlumniController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alumni = Alumni::with('created_user', 'updated_user')->orderBy('title', 'desc')->get();
        $alumni_photos = AlumniPhoto::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'alumni' => $alumni,
            'alumni_photos' => $alumni_photos,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AlumniStoreRequest $request)
    {
        $data = $request->validated();
        $old_alumni_count = Alumni::all()->count();
        if ($old_alumni_count >= 1) {
            throw ValidationException::withMessages([
                'title' =>  'Cannot Add Another Data . You can Update data and Update New Photo at Update Alumni Photo Tab! '
            ]);
        }
        $data['created_user_id'] = Auth::user()->id;
        try {
            DB::beginTransaction();

            // create banner 
            if (isset($data['banner'])) {
                $filePath = "img/alumni_data/";
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['banner'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/alumni_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/alumni_" . $imageUid . "." . $extension);
                $data['banner'] = "/" . $photoName;
            }
            // create post
            $alumni = Alumni::create($data);

            // Create alumni Photos
            $alumni_photos = $data['alumni_photo'] ?? [];
            if (!empty($alumni_photos)) {
                $folderPath = "img/alumni_data/alumni";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }

                $savedAlumniPhotos = [];
                foreach ($alumni_photos as $alumni_photo) {
                    if (!empty($alumni_photo['image'])) {
                        $file = $alumni_photo['image'];
                        $fileName = "alumni_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $alumni_photo['image'] = "/" . $folderPath . "/" . $fileName;
                    }
                    $alumni_photo['created_user_id']  = $data['created_user_id'];
                    $savedAlumniPhotos[] = $alumni_photo;
                }
                AlumniPhoto::insert($savedAlumniPhotos);
            }
            DB::commit();
            return back()->with('success', 'Alumni Created Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            // delete file if exists
            $filePath = "img/alumni_data/";
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
    public function update(AlumniUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        $data['updated_user_id'] = Auth::user()->id;
        $alumni = Alumni::findOrFail($id);
        try {
            DB::beginTransaction();
            if (isset($data['banner'])) {
                if (File::exists(public_path($alumni->banner))) {
                    File::delete(public_path($alumni->banner));
                }
                $filePath = "img/alumni_data/";
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['banner'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/alumni_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/alumni_" . $imageUid . "." . $extension);
                $data['banner'] = "/" . $photoName;
            }
            $alumni->update($data);

            DB::commit();
            return back()->with('success', 'Alumni Data Updates Successfully.');
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
        throw ValidationException::withMessages([
            'title' =>  'You Cannot Delete Alumni Data . Please Report to IT Admin!'
        ]);
    }
    public function photoUpdate(AlumniPhotoUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $alumni = Alumni::findOrFail($id);
            // Create alumni photo
            $photos = $data['alumni_photo'] ?? [];

            // Delete Data
            $existingIds = AlumniPhoto::pluck('id')
                ->toArray();

            $sentIds = collect($photos)
                ->pluck('id')
                ->filter() // remove null
                ->toArray();
            $idsToDelete = array_diff($existingIds, $sentIds);

            if (!empty($idsToDelete)) {
                $deletePhotos = AlumniPhoto::whereIn('id', $idsToDelete)->get();

                foreach ($deletePhotos as $del) {
                    if (!empty($del->image) && File::exists(public_path($del->image))) {
                        File::delete(public_path($del->image));
                    }
                    $del->delete();
                }
            }

            if (!empty($photos)) {

                $folderPath = "img/alumni_data/alumni";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }
                foreach ($photos as $key => $photo) {
                    $old_alumni_photo = AlumniPhoto::find($photo['id']);
                    if (!empty($photo['image'])) {
                        if (isset($old_alumni_photo)) {
                            if (File::exists(public_path($old_alumni_photo->image))) {
                                File::delete(public_path($old_alumni_photo->image));
                            }
                        }
                        $file = $photo['image'];
                        $fileName = "alumni_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $photo['image'] = "/" . $folderPath . "/" . $fileName;
                    } else {
                        unset($photo['image']); // prevent overwriting if no new file
                    }
                    $photo['updated_user_id']  = Auth::user()->id;
                    if (isset($old_alumni_photo)) {
                        $old_alumni_photo->update($photo);
                    } else {
                        unset($photo['id']);
                        $photo['created_user_id']  = Auth::user()->id;
                        AlumniPhoto::create($photo);
                    }
                }
            }
            DB::commit();
            return back()->with('success', 'Alumni Photo Updated Successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            // Handle the error
            throw ValidationException::withMessages([
                'title' =>  $e->getMessage()
            ]);
        }
    }
}
