<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Partner;

class PartnersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $partners = Partner::get();
        return response()->json($partners);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $partner = new Partner();

        $img_dir_prefix = "uploads/partners/";
        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $image_new_name = time() . $image->getClientOriginalName();
            $image->move('uploads/partners', $image_new_name);
        }

        $partner->image = isset($image_new_name) ? $img_dir_prefix.rawurlencode($image_new_name) : null;
        $partner->link = $request->input('link');
        $partner->save();

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
        $partner = Partner::find($id);
        return response()->json($partner);
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
        $partner = Partner::find($id);

        $img_dir_prefix = "uploads/partners/";
        if ($request->hasFile('image')) {
            if(is_file($partner->image)) {
                $oldImage = public_path($partner->image);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $image = $request->file("image");
            $image_new_name = time() . $image->getClientOriginalName();
            $image->move('uploads/partners', $image_new_name);

            $partner->image = $img_dir_prefix.rawurlencode($image_new_name);
        }
        $partner->link = $request->input('link');
        $partner->save();
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
        $partner = Partner::find($id);
        $partner->delete();

        return response()->json('1');
    }
}
