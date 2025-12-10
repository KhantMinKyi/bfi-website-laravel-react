<?php

namespace App\Http\Controllers;

use App\Http\Requests\SisterSchoolBannerUpdateRequest;
use App\Http\Requests\SisterSchoolLeadershipUpdateRequest;
use App\Http\Requests\SisterSchoolStoreRequest;
use App\Models\SisterSchool;
use App\Models\SisterSchoolBanner;
use App\Models\SisterSchoolLeadership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class SisterSchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sister_schools = SisterSchool::with('banners', 'leaderships')->orderBy('name', 'desc')->get();
        return response()->json(
            [
                'message' => 'success',
                'data' => $sister_schools
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SisterSchoolStoreRequest $request)
    {
        $data = $request->validated();
        $data['created_user_id'] = Auth::user()->id;
        try {
            DB::beginTransaction();
            // $sisterSchoolUid = uniqid('', true);
            // create Logo 
            if (isset($data['logo'])) {
                $filePath = "img/sister_schools_data/" . $data['short_name'];
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['logo'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/sister_school_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/sister_school_" . $imageUid . "." . $extension);
                $data['logo'] = "/" . $photoName;
            }
            // create Logo Black
            if (isset($data['logo_b'])) {
                $filePath = "img/sister_schools_data/" . $data['short_name'];
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['logo_b'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/sister_school_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/sister_school_" . $imageUid . "." . $extension);
                $data['logo_b'] = "/" . $photoName;
            }
            // create HOS Image 
            if (isset($data['hos_image'])) {
                $filePath = "img/sister_schools_data/" . $data['short_name'];
                if (!File::exists($filePath)) {
                    $result = File::makeDirectory($filePath, 0755, true);
                }

                $photo = $data['hos_image'];
                $extension = $photo->getClientOriginalExtension();
                $imageUid = uniqid('', true);
                $photoName = $filePath . "/sister_school_" . $imageUid . "." . $extension;

                $photo->move($filePath, "/sister_school_" . $imageUid . "." . $extension);
                $data['hos_image'] = "/" . $photoName;
            }

            // create post
            $sister_school = SisterSchool::create($data);

            // Create Sister School banners
            $banners = $data['sister_school_banner'] ?? [];
            if (!empty($banners)) {
                $folderPath = "img/sister_schools_data/" . $data['short_name'] . "/banners";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }

                $savedBanners = [];
                foreach ($banners as $banner) {
                    if (!empty($banner['banner_image'])) {
                        $file = $banner['banner_image'];
                        $fileName = "sister_school_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $banner['banner_image'] = "/" . $folderPath . "/" . $fileName;
                    }
                    $banner['sister_school_id'] = $sister_school->id;
                    $banner['created_user_id']  = $data['created_user_id'];
                    $savedBanners[] = $banner;
                }
                SisterSchoolBanner::insert($savedBanners);
            }

            // Create Sister School banners
            $leaderships = $data['sister_school_leadership'] ?? [];
            if (!empty($leaderships)) {
                $folderPath = "img/sister_schools_data/" . $data['short_name'] . "/leaderships";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }

                $savedLeaderships = [];
                foreach ($leaderships as $leadership) {
                    if (!empty($leadership['image'])) {
                        $file = $leadership['image'];
                        $fileName = "sister_school_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $leadership['image'] = "/" . $folderPath . "/" . $fileName;
                    }
                    $leadership['sister_school_id'] = $sister_school->id;
                    $leadership['created_user_id']  = $data['created_user_id'];
                    $savedLeaderships[] = $leadership;
                }
                SisterSchoolLeadership::insert($savedLeaderships);
            }

            DB::commit();

            return back()->with('success', 'Sister School Created Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            // delete file if exists
            $filePath = "img/sister_schools_data/" . $data['short_name'];
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

    /**
     * Update Banner of Sister Schools
     *
     * @param SisterSchoolBannerUpdateRequest $request
     * @param string $id
     * @return void
     */
    public function bannerUpdate(SisterSchoolBannerUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $sister_school = SisterSchool::findOrFail($id);
            // Create Sister School banners
            $banners = $data['sister_school_banner'] ?? [];

            // Delete Data
            $existingIds = SisterSchoolBanner::where('sister_school_id', $id)
                ->pluck('id')
                ->toArray();

            $sentIds = collect($banners)
                ->pluck('id')
                ->filter() // remove null
                ->toArray();
            $idsToDelete = array_diff($existingIds, $sentIds);

            if (!empty($idsToDelete)) {
                $deleteBanners = SisterSchoolBanner::whereIn('id', $idsToDelete)->get();

                foreach ($deleteBanners as $del) {
                    if (!empty($del->banner_image) && File::exists(public_path($del->banner_image))) {
                        File::delete(public_path($del->banner_image));
                    }
                    $del->delete();
                }
            }

            if (!empty($banners)) {

                $folderPath = "img/sister_schools_data/" . $sister_school->short_name . "/banners";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }
                foreach ($banners as $key => $banner) {
                    $old_sister_school_banner = SisterSchoolBanner::find($banner['id']);
                    if (!empty($banner['banner_image'])) {
                        if (isset($old_sister_school_banner)) {
                            if (File::exists(public_path($old_sister_school_banner->banner_image))) {
                                File::delete(public_path($old_sister_school_banner->banner_image));
                            }
                        }
                        $file = $banner['banner_image'];
                        $fileName = "sister_school_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $banner['banner_image'] = "/" . $folderPath . "/" . $fileName;
                    } else {
                        unset($banner['banner_image']); // prevent overwriting if no new file
                    }
                    $banner['updated_user_id']  = Auth::user()->id;
                    if (isset($old_sister_school_banner)) {
                        $old_sister_school_banner->update($banner);
                    } else {
                        unset($banner['id']);
                        $banner['created_user_id']  = Auth::user()->id;
                        $banner['sister_school_id']  = $id;
                        SisterSchoolBanner::create($banner);
                    }
                }
            }
            DB::commit();

            return back()->with('success', 'Sister School Banner Updated Successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            // Handle the error
            throw ValidationException::withMessages([
                'title' =>  $e->getMessage()
            ]);
        }
    }
    public function leadershipUpdate(SisterSchoolLeadershipUpdateRequest $request, $id)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $sister_school = SisterSchool::findOrFail($id);
            // Create Sister School Leaderships
            $leaderships = $data['sister_school_leadership'] ?? [];

            // Delete Data
            $existingIds = SisterSchoolLeadership::where('sister_school_id', $id)
                ->pluck('id')
                ->toArray();

            $sentIds = collect($leaderships)
                ->pluck('id')
                ->filter() // remove null
                ->toArray();
            $idsToDelete = array_diff($existingIds, $sentIds);

            if (!empty($idsToDelete)) {
                $deleteleaderships = SisterSchoolLeadership::whereIn('id', $idsToDelete)->get();

                foreach ($deleteleaderships as $del) {
                    if (!empty($del->image) && File::exists(public_path($del->image))) {
                        File::delete(public_path($del->image));
                    }
                    $del->delete();
                }
            }

            if (!empty($leaderships)) {

                $folderPath = "img/sister_schools_data/" . $sister_school->short_name . "/leaderships";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }
                foreach ($leaderships as $key => $leadership) {
                    $old_sister_school_leadership = SisterSchoolLeadership::find($leadership['id']);
                    if (!empty($leadership['image'])) {
                        if (isset($old_sister_school_leadership)) {
                            if (File::exists(public_path($old_sister_school_leadership->image))) {
                                File::delete(public_path($old_sister_school_leadership->image));
                            }
                        }
                        $file = $leadership['image'];
                        $fileName = "sister_school_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $leadership['image'] = "/" . $folderPath . "/" . $fileName;
                    } else {
                        unset($leadership['image']); // prevent overwriting if no new file
                    }
                    $leadership['updated_user_id']  = Auth::user()->id;
                    if (isset($old_sister_school_leadership)) {
                        $old_sister_school_leadership->update($leadership);
                    } else {
                        unset($leadership['id']);
                        $leadership['created_user_id']  = Auth::user()->id;
                        $leadership['sister_school_id']  = $id;
                        SisterSchoolLeadership::create($leadership);
                    }
                }
            }
            DB::commit();

            return back()->with('success', 'Sister School Leadership Updated Successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            // Handle the error
            throw ValidationException::withMessages([
                'title' =>  $e->getMessage()
            ]);
        }
    }
}
