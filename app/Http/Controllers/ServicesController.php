<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Service;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $services = Service::withTranslation()->get();
        return response()->json($services);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $service = new Service();

        $img_dir_prefix = "uploads/services/";
        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $image_new_name = time() . $image->getClientOriginalName();
            $image->move('uploads/services', $image_new_name);
        }

        $service->image = isset($image_new_name) ? $img_dir_prefix.rawurlencode($image_new_name) : null;

        foreach (config('translatable.locales') as $locale) {
            $name = $locale.'_name';
            $description = $locale.'_description';
            if($request->input($name)) {
                $service->translateOrNew($locale)->name = $request->input($name);
                $service->translateOrNew($locale)->description = $request->input($description);
            }
        }
        $service->slug = Str::slug($request->input('en_name'));
        $service->save();

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
        $service = Service::withTranslation()->find($id);
        $service_raw = Service::find($id);
        foreach (config('translatable.locales') as $locale) {
            $name = $locale.'_name';
            $description = $locale.'_description';

            $service->$name = $service_raw->translate($locale)->name;
            $service->$description = $service_raw->translate($locale)->description;
        }
        return response()->json($service);
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
        $service = Service::find($id);

        $img_dir_prefix = "uploads/services/";
        if ($request->hasFile('image')) {
            if(is_file($service->image)) {
                $oldImage = public_path($service->image);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $image = $request->file("image");
            $image_new_name = time() . $image->getClientOriginalName();
            $image->move('uploads/services', $image_new_name);

            $service->image = $img_dir_prefix.rawurlencode($image_new_name);
        }

        foreach (config('translatable.locales') as $locale) {
            if($service->hasTranslation($locale)) {
                $name = $locale . '_name';
                $description = $locale . '_description';

                $service->getTranslation($locale)->name = $request->input($name);
                $service->getTranslation($locale)->description = $request->input($description);
            }
        }
        $service->slug = Str::slug($request->input('en_name'));

        $service->save();
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
        $service = Service::find($id);
        $service->delete();

        return response()->json('1');
    }
}
