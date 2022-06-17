<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HomeCarouselSlide;
use Illuminate\Support\Str;

class HomeCarouselSlidesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $home_carousel_slides = HomeCarouselSlide::get();
        return response()->json($home_carousel_slides);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $img_dir_prefix = "uploads/home_carousel_slides/";
        if ($request->hasFile("desktop_image")) {
            $desktop_image = $request->file("desktop_image");
            $desktop_image_new_name = time() . $desktop_image->getClientOriginalName();
            $desktop_image->move('uploads/home_carousel_slides', $desktop_image_new_name);
        }
        if ($request->hasFile("mobile_image")) {
            $mobile_image = $request->file("mobile_image");
            $mobile_image_new_name = time() . $mobile_image->getClientOriginalName();
            $mobile_image->move('uploads/home_carousel_slides', $mobile_image_new_name);
        }

        $home_carousel_slide = new HomeCarouselSlide();
        $home_carousel_slide->desktop_image = isset($desktop_image_new_name) ? $img_dir_prefix.rawurlencode($desktop_image_new_name) : null;
        $home_carousel_slide->mobile_image = isset($mobile_image_new_name) ? $img_dir_prefix.rawurlencode($mobile_image_new_name) : null;
        foreach (config('translatable.locales') as $locale) {
            $title = $locale.'_title';
            $description = $locale.'_description';
            $sub_title = $locale.'_sub_title';
            if($request->input($title)) {
                $home_carousel_slide->translateOrNew($locale)->title = $request->input($title);
                $home_carousel_slide->translateOrNew($locale)->description = $request->input($description);
                $home_carousel_slide->translateOrNew($locale)->sub_title = $request->input($sub_title);
            }
        }
        $home_carousel_slide->slug = Str::slug($request->input('en_title'));

        $home_carousel_slide->save();

        return response()->json('1');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $data = new \stdClass();
        $home_carousel_slide = HomeCarouselSlide::find($id);
        $home_carousel_slide_raw = HomeCarouselSlide::find($id);
        foreach (config('translatable.locales') as $locale) {
            $title = $locale.'_title';
            $description = $locale.'_description';
            $sub_title = $locale.'_sub_title';

            $home_carousel_slide->$title = $home_carousel_slide_raw->translate($locale)->title;
            $home_carousel_slide->$description = $home_carousel_slide_raw->translate($locale)->description;
            $home_carousel_slide->$sub_title = $home_carousel_slide_raw->translate($locale)->sub_title;
        }

        return response()->json($home_carousel_slide);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $home_carousel_slide = HomeCarouselSlide::find($id);

        $img_dir_prefix = "uploads/home_carousel_slides/";

        if ($request->hasFile('desktop_image')) {
            if(is_file($home_carousel_slide->desktop_image)) {
                $oldImage = public_path($home_carousel_slide->desktop_image);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $desktop_image = $request->file("desktop_image");
            $desktop_image_new_name = time() . $desktop_image->getClientOriginalName();
            $desktop_image->move('uploads/home_carousel_slides', $desktop_image_new_name);
            $home_carousel_slide->desktop_image = $img_dir_prefix.rawurlencode($desktop_image_new_name);
        }
        if ($request->hasFile('mobile_image')) {
            if(is_file($home_carousel_slide->mobile_image)) {
                $oldImage = public_path($home_carousel_slide->mobile_image);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $mobile_image = $request->file("mobile_image");
            $mobile_image_new_name = time() . $mobile_image->getClientOriginalName();
            $mobile_image->move('uploads/home_carousel_slides', $mobile_image_new_name);
            $home_carousel_slide->mobile_image = $img_dir_prefix.rawurlencode($mobile_image_new_name);
        }

        foreach (config('translatable.locales') as $locale) {
            if($home_carousel_slide->hasTranslation($locale)) {
                $title = $locale . '_title';
                $description = $locale . '_description';
                $sub_title = $locale . '_sub_title';

                $home_carousel_slide->getTranslation($locale)->title = $request->input($title);
                $home_carousel_slide->getTranslation($locale)->description = $request->input($description);
                $home_carousel_slide->getTranslation($locale)->sub_title = $request->input($sub_title);
            }
        }
        $home_carousel_slide->slug = Str::slug($request->input('en_title'));

        $home_carousel_slide->save();
        return response()->json('1');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $home_carousel_slide = HomeCarouselSlide::find($id);
        $home_carousel_slide->delete();

        return response()->json('1');
    }
}
