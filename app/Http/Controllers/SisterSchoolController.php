<?php

namespace App\Http\Controllers;

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
                    $leadership['sister_school_id'] = 1;
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
}
