<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\App;
use App\Models\MetaDescription;

class BlogsDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($locale = 'hy')
    {
        App::setLocale($locale);
        $data = new \stdClass();
        $data->meta_description = MetaDescription::withTranslation()->where("page", "blogs")->first()->name;
        $blogs = Blog::withTranslation()->get();
        foreach($blogs as $blog) {
            $html_reg = '/<+\s*\/*\s*([A-Z][A-Z0-9]*)\b[^>]*\/*\s*>+/i';
            $special_char_reg = '/&(lt|gt|quot|amp|apos|laquo|raquo|times|shy);/i';
            $special_char_reg_two = '/(lt|gt|quot|amp|apos|laquo|raquo|times);/i';
            $special_char_reg_three = '/nbsp;/i';

            $blog->description = htmlentities(preg_replace($html_reg, '', $blog->description ));
            $blog->description = preg_replace($special_char_reg, '', $blog->description );


            $blog->description = preg_replace($special_char_reg, '', $blog->description );
            $blog->description = preg_replace($special_char_reg_two, '', $blog->description );
            $blog->description = preg_replace($special_char_reg_three, ' ', $blog->description);
        }
        $data->blogs = $blogs;
        return response()->json($data);
    }
}
