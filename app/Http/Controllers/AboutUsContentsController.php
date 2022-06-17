<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AboutUsContent;

class AboutUsContentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $about_us_content = AboutUsContent::withTranslation()->get();
        return response()->json($about_us_content);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $about_us_content = AboutUsContent::withTranslation()->find($id);
        $about_us_content_raw = AboutUsContent::find($id);
        foreach (config('translatable.locales') as $locale) {
            $page_content = $locale . '_page_content';
            $about_us_content->$page_content = $about_us_content_raw->translate($locale)->page_content;
        }
        return response()->json($about_us_content);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $about_us_content = AboutUsContent::find($id);

        foreach (config('translatable.locales') as $locale) {
            if($about_us_content->hasTranslation($locale)) {
                $page_content = $locale . '_page_content';
                $about_us_content->getTranslation($locale)->page_content = $request->input($page_content);
            }
        }

        $about_us_content->save();
        return response()->json('1');
    }
}
