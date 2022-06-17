<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MetaDescription;

class MetaDescriptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $meta_descriptions = MetaDescription::get();
        return response()->json($meta_descriptions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $meta_description = new MetaDescription();
        $meta_description->page = $request->input("page");
        foreach (config('translatable.locales') as $locale) {
            $name = $locale.'_name';
            if($request->input($name)) {
                $meta_description->translateOrNew($locale)->name = $request->input($name);
            }
        }
        $meta_description->save();
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
        $meta_description = MetaDescription::find($id);
        $meta_description_raw = MetaDescription::find($id);
        foreach (config('translatable.locales') as $locale) {
            $name = $locale.'_name';
            $meta_description->$name = $meta_description_raw->translate($locale)->name;
        }
        return response()->json($meta_description);
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
        $meta_description = MetaDescription::find($id);
        $meta_description->page = $request->input('page');
        foreach (config('translatable.locales') as $locale) {
            if($meta_description->hasTranslation($locale)) {
                $name = $locale . '_name';
                $meta_description->getTranslation($locale)->name = $request->input($name);
            }
        }
        $meta_description->save();
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
        $meta_description = MetaDescription::find($id);
        $meta_description->delete();

        return response()->json('1');
    }
}
