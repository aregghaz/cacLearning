<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\NewsItem;

class NewsItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $news_items = NewsItem::withTranslation()->get();
        return response()->json($news_items);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $news_item = new NewsItem();

        $img_dir_prefix = "uploads/news_items/";
        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $image_new_name = time() . $image->getClientOriginalName();
            $image->move('uploads/news_items', $image_new_name);
        }

        $news_item->image = isset($image_new_name) ? $img_dir_prefix.rawurlencode($image_new_name) : null;
        $news_item->date = $request->input('date') || 0;

        foreach (config('translatable.locales') as $locale) {
            $title = $locale.'_title';
            $description = $locale.'_description';
            if($request->input($title)) {
                $news_item->translateOrNew($locale)->title = $request->input($title);
                $news_item->translateOrNew($locale)->description = $request->input($description);
            }
        }
        $news_item->slug = Str::slug($request->input('en_title'));
        $news_item->save();

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
        $news_item = NewsItem::withTranslation()->find($id);
        $news_item_raw = NewsItem::find($id);
        foreach (config('translatable.locales') as $locale) {
            $title = $locale.'_title';
            $description = $locale.'_description';

            $news_item->$title = $news_item_raw->translate($locale)->title;
            $news_item->$description = $news_item_raw->translate($locale)->description;
        }
        return response()->json($news_item);
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
        $news_item = NewsItem::find($id);

        $img_dir_prefix = "uploads/news_items/";
        if ($request->hasFile('image')) {
            if(is_file($news_item->image)) {
                $oldImage = public_path($news_item->image);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $image = $request->file("image");
            $image_new_name = time() . $image->getClientOriginalName();
            $image->move('uploads/news_items', $image_new_name);

            $news_item->image = $img_dir_prefix.rawurlencode($image_new_name);
        }

        foreach (config('translatable.locales') as $locale) {
            if($news_item->hasTranslation($locale)) {
                $title = $locale . '_title';
                $description = $locale . '_description';

                $news_item->getTranslation($locale)->title = $request->input($title);
                $news_item->getTranslation($locale)->description = $request->input($description);
            }
        }
        $news_item->slug = Str::slug($request->input('en_title'));
        $news_item->date = $request->input('date');
        $news_item->save();
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
        $news_item = NewsItem::find($id);
        $news_item->delete();

        return response()->json('1');
    }
}
