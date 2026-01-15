<?php

namespace App\Http\Controllers;

use App\Http\Requests\SisterSchoolBannerUpdateRequest;
use App\Http\Requests\SisterSchoolLeadershipUpdateRequest;
use App\Http\Requests\SisterSchoolRelatedCampusUpdateRequest;
use App\Http\Requests\SisterSchoolStoreRequest;
use App\Http\Requests\SisterSchoolUpdateRequest;
use App\Models\SisterSchool;
use App\Models\SisterSchoolBanner;
use App\Models\SisterSchoolLeadership;
use App\Models\SisterSchoolRelatedCampus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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
        $sister_schools = SisterSchool::with('banners', 'leaderships', 'related_campuses')->orderBy('name', 'desc')->get();
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
                $filePath = "img/sister_schools_data/" . $data['slug'];
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
                $filePath = "img/sister_schools_data/" . $data['slug'];
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
                $filePath = "img/sister_schools_data/" . $data['slug'];
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
                $folderPath = "img/sister_schools_data/" . $data['slug'] . "/banners";
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

            // Create Sister School Leadership
            // $leaderships = $data['sister_school_leadership'] ?? [];
            // if (!empty($leaderships)) {
            //     $folderPath = "img/sister_schools_data/" . $data['slug'] . "/leaderships";
            //     if (!File::exists($folderPath)) {
            //         File::makeDirectory($folderPath, 0755, true);
            //     }

            //     $savedLeaderships = [];
            //     foreach ($leaderships as $leadership) {
            //         if (!empty($leadership['image'])) {
            //             $file = $leadership['image'];
            //             $fileName = "sister_school_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
            //             $file->move($folderPath, $fileName);
            //             $leadership['image'] = "/" . $folderPath . "/" . $fileName;
            //         }
            //         $leadership['sister_school_id'] = $sister_school->id;
            //         $leadership['created_user_id']  = $data['created_user_id'];
            //         $savedLeaderships[] = $leadership;
            //     }
            //     SisterSchoolLeadership::insert($savedLeaderships);
            // }

            // Create Sister School Related Campuses
            $related_campuses = $data['sister_school_related_campus'] ?? [];
            if (!empty($related_campuses)) {
                $folderPath = "img/sister_schools_data/" . $data['slug'] . "/related_campuses";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }

                $savedRelatedCampuses = [];
                foreach ($related_campuses as $related_campus) {
                    if (!empty($related_campus['image'])) {
                        $file = $related_campus['image'];
                        $fileName = "sister_school_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $related_campus['image'] = "/" . $folderPath . "/" . $fileName;
                    }
                    $related_campus['sister_school_id'] = $sister_school->id;
                    $related_campus['created_user_id']  = $data['created_user_id'];
                    $savedRelatedCampuses[] = $related_campus;
                }
                SisterSchoolRelatedCampus::insert($savedRelatedCampuses);
            }

            DB::commit();
            Cache::forget('shared_sister_schools');
            return back()->with('success', 'Sister School Created Successfully.');
        } catch (\Exception $e) {

            DB::rollBack();
            // delete file if exists
            $filePath = "img/sister_schools_data/" . $data['slug'];
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
    public function update(SisterSchoolUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        $data['updated_user_id'] = Auth::user()->id;
        $sister_school = SisterSchool::findOrFail($id);
        try {
            DB::beginTransaction();
            if (isset($data['logo'])) {
                if (File::exists(public_path($sister_school->logo))) {
                    File::delete(public_path($sister_school->logo));
                }
                $filePath = "img/sister_schools_data/" . $data['slug'];
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
            if (isset($data['logo_b'])) {
                if (File::exists(public_path($sister_school->logo_b))) {
                    File::delete(public_path($sister_school->logo_b));
                }
                $filePath = "img/sister_schools_data/" . $data['slug'];
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
            if (isset($data['hos_image'])) {
                if (File::exists(public_path($sister_school->hos_image))) {
                    File::delete(public_path($sister_school->hos_image));
                }
                $filePath = "img/sister_schools_data/" . $data['slug'];
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
            $sister_school->update($data);

            DB::commit();
            Cache::forget('shared_sister_schools');
            return back()->with('success', 'Sister School Updates Successfully.');
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
        $sister_school = SisterSchool::with('banners', 'leaderships', 'related_campuses')->findOrFail($id);
        try {
            DB::transaction(function () use ($sister_school) {

                $filePath = "img/sister_schools_data/" . $sister_school->slug;

                // Delete relations
                $sister_school->banners()->delete();
                $sister_school->leaderships()->delete();
                $sister_school->related_campuses()->delete();

                // Delete main record
                $sister_school->delete();
                Cache::forget('shared_sister_schools');
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

                $folderPath = "img/sister_schools_data/" . $sister_school->slug . "/banners";
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
            Cache::forget('shared_sister_schools');
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

                $folderPath = "img/sister_schools_data/" . $sister_school->slug . "/leaderships";
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
            Cache::forget('shared_sister_schools');
            return back()->with('success', 'Sister School Leadership Updated Successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            // Handle the error
            throw ValidationException::withMessages([
                'title' =>  $e->getMessage()
            ]);
        }
    }
    public function relatedCampusUpdate(SisterSchoolRelatedCampusUpdateRequest $request, $id)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $sister_school = SisterSchool::findOrFail($id);
            // Create Sister School Related Campuses
            $related_campuses = $data['sister_school_related_campuses'] ?? [];

            // Delete Data
            $existingIds = SisterSchoolRelatedCampus::where('sister_school_id', $id)
                ->pluck('id')
                ->toArray();

            $sentIds = collect($related_campuses)
                ->pluck('id')
                ->filter() // remove null
                ->toArray();
            $idsToDelete = array_diff($existingIds, $sentIds);

            if (!empty($idsToDelete)) {
                $delete_related_campuses = SisterSchoolRelatedCampus::whereIn('id', $idsToDelete)->get();

                foreach ($delete_related_campuses as $del) {
                    if (!empty($del->image) && File::exists(public_path($del->image))) {
                        File::delete(public_path($del->image));
                    }
                    $del->delete();
                }
            }

            if (!empty($related_campuses)) {

                $folderPath = "img/sister_schools_data/" . $sister_school->slug . "/related_campuses";
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }
                foreach ($related_campuses as $key => $related_campus) {
                    $old_sister_school_related_campus = SisterSchoolRelatedCampus::find($related_campus['id']);
                    if (!empty($related_campus['image'])) {
                        if (isset($old_sister_school_related_campus)) {
                            if (File::exists(public_path($old_sister_school_related_campus->image))) {
                                File::delete(public_path($old_sister_school_related_campus->image));
                            }
                        }
                        $file = $related_campus['image'];
                        $fileName = "sister_school_" . uniqid('', true) . "." . $file->getClientOriginalExtension();
                        $file->move($folderPath, $fileName);
                        $related_campus['image'] = "/" . $folderPath . "/" . $fileName;
                    } else {
                        unset($related_campus['image']); // prevent overwriting if no new file
                    }
                    $related_campus['updated_user_id']  = Auth::user()->id;
                    if (isset($old_sister_school_related_campus)) {
                        $old_sister_school_related_campus->update($related_campus);
                    } else {
                        unset($related_campus['id']);
                        $related_campus['created_user_id']  = Auth::user()->id;
                        $related_campus['sister_school_id']  = $id;
                        SisterSchoolRelatedCampus::create($related_campus);
                    }
                }
            }
            DB::commit();
            Cache::forget('shared_sister_schools');
            return back()->with('success', 'Sister School Related Campus Updated Successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            // Handle the error
            throw ValidationException::withMessages([
                'title' =>  $e->getMessage()
            ]);
        }
    }
}
