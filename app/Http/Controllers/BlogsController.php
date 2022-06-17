<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Blog;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $blogs = Blog::withTranslation()->get();
        return response()->json($blogs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $blog = new Blog();

        $img_dir_prefix = "uploads/blogs/";
        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $image_new_name = time() . $image->getClientOriginalName();
            $image->move('uploads/blogs', $image_new_name);
        }

        $blog->image = isset($image_new_name) ? $img_dir_prefix.rawurlencode($image_new_name) : null;

        foreach (config('translatable.locales') as $locale) {
            $title = $locale.'_title';
            $description = $locale.'_description';
            $author = $locale.'_author';
            $position = $locale.'_position';
            if($request->input($title)) {
                $blog->translateOrNew($locale)->title = $request->input($title);
                $blog->translateOrNew($locale)->description = $request->input($description);
                $blog->translateOrNew($locale)->author = $request->input($author);
                $blog->translateOrNew($locale)->position = $request->input($position);
            }
        }
        $blog->slug = Str::slug($request->input('en_title'));

        $blog->save();

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
        $blog = Blog::withTranslation()->find($id);
        $blog_raw = Blog::find($id);
        foreach (config('translatable.locales') as $locale) {
            $title = $locale.'_title';
            $description = $locale.'_description';
            $author = $locale.'_author';
            $position = $locale.'_position';

            $blog->$title = $blog_raw->translate($locale)->title;
            $blog->$description = $blog_raw->translate($locale)->description;
            $blog->$author = $blog_raw->translate($locale)->author;
            $blog->$position = $blog_raw->translate($locale)->position;
        }
        return response()->json($blog);
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
        $blog = Blog::find($id);

        $img_dir_prefix = "uploads/blogs/";
        if ($request->hasFile('image')) {
            if(is_file($blog->image)) {
                $oldImage = public_path($blog->image);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $image = $request->file("image");
            $image_new_name = time() . $image->getClientOriginalName();
            $image->move('uploads/blogs', $image_new_name);

            $blog->image = $img_dir_prefix.rawurlencode($image_new_name);
        }

        foreach (config('translatable.locales') as $locale) {
            if($blog->hasTranslation($locale)) {
                $title = $locale . '_title';
                $description = $locale . '_description';
                $author = $locale . '_author';
                $position = $locale . '_position';

                $blog->getTranslation($locale)->title = $request->input($title);
                $blog->getTranslation($locale)->description = $request->input($description);
                $blog->getTranslation($locale)->author = $request->input($author);
                $blog->getTranslation($locale)->position = $request->input($position);
            }
        }
        $blog->slug = Str::slug($request->input('en_title'));

        $blog->save();
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
        $blog = Blog::find($id);
        $blog->delete();

        return response()->json('1');
    }
}
