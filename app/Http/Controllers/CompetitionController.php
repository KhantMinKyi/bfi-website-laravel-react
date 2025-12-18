<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompetitionPhotoUpdateRequest;
use App\Http\Requests\CompetitionStoreRequest;
use App\Models\Competition;
use App\Models\CompetitionPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $competitions = Competition::with('related_photos', 'created_user', 'updated_user')->orderBy('name', 'desc')->get();
        return response()->json([
            'message' => 'success',
            'competitions' => $competitions
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompetitionStoreRequest $request)
    {
        $data = $request->validated();
        $data['created_user_id'] = Auth::user()->id;
        try {
            DB::beginTransaction();

            // create banner 
            if (isset($data['banner'])) {
                $filePath = "img/competition_data/" . $data['slug'];
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['banner'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/competition_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/competition_" . $imageUid . "." . $extension);
                $data['banner'] = "/" . $photoName;
            }
            // create post
            $competition = Competition::create($data);

            // Create Competition Photos
            $competition_photos = $data['competition_photo'] ?? [];
            if (!empty($competition_photos)) {
                $folderPath = "img/competition_data/" . $data['slug'] . "/competition";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }

                $savedCompetitionPhotos = [];
                foreach ($competition_photos as $competition_photo) {
                    if (!empty($competition_photo['image'])) {
                        $file = $competition_photo['image'];
                        $fileName = "competition_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $competition_photo['image'] = "/" . $folderPath . "/" . $fileName;
                    }
                    $competition_photo['competition_id'] = $competition->id;
                    $competition_photo['created_user_id']  = $data['created_user_id'];
                    $savedCompetitionPhotos[] = $competition_photo;
                }
                CompetitionPhoto::insert($savedCompetitionPhotos);
            }
            DB::commit();

            return back()->with('success', 'Competition Created Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            // delete file if exists
            $filePath = "img/competition_data/" . $data['slug'];
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
        $competition = Competition::with('related_photos')->findOrFail($id);
        try {
            DB::transaction(function () use ($competition) {

                $filePath = "img/competition_data/" . $competition->slug;

                // Delete relations
                $competition->related_photos()->delete();

                // Delete main record
                $competition->delete();

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
     * Update Competition Photos
     *
     * @param CompetitionPhotoUpdateRequest $request
     * @param string $id
     * @return void
     */
    public function photoUpdate(CompetitionPhotoUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $competition = Competition::findOrFail($id);
            // Create competition photo
            $photos = $data['competition_photo'] ?? [];

            // Delete Data
            $existingIds = CompetitionPhoto::where('competition_id', $id)
                ->pluck('id')
                ->toArray();

            $sentIds = collect($photos)
                ->pluck('id')
                ->filter() // remove null
                ->toArray();
            $idsToDelete = array_diff($existingIds, $sentIds);

            if (!empty($idsToDelete)) {
                $deletePhotos = CompetitionPhoto::whereIn('id', $idsToDelete)->get();

                foreach ($deletePhotos as $del) {
                    if (!empty($del->image) && File::exists(public_path($del->image))) {
                        File::delete(public_path($del->image));
                    }
                    $del->delete();
                }
            }

            if (!empty($photos)) {

                $folderPath = "img/competition_data/" . $competition->slug . "/competition";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }
                foreach ($photos as $key => $photo) {
                    $old_competition_photo = CompetitionPhoto::find($photo['id']);
                    if (!empty($photo['image'])) {
                        if (isset($old_competition_photo)) {
                            if (File::exists(public_path($old_competition_photo->image))) {
                                File::delete(public_path($old_competition_photo->image));
                            }
                        }
                        $file = $photo['image'];
                        $fileName = "competition_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $photo['image'] = "/" . $folderPath . "/" . $fileName;
                    } else {
                        unset($photo['image']); // prevent overwriting if no new file
                    }
                    $photo['updated_user_id']  = Auth::user()->id;
                    if (isset($old_competition_photo)) {
                        $old_competition_photo->update($photo);
                    } else {
                        unset($photo['id']);
                        $photo['created_user_id']  = Auth::user()->id;
                        $photo['competition_id']  = $id;
                        CompetitionPhoto::create($photo);
                    }
                }
            }
            DB::commit();

            return back()->with('success', 'Competition Photo Updated Successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            // Handle the error
            throw ValidationException::withMessages([
                'title' =>  $e->getMessage()
            ]);
        }
    }
}
