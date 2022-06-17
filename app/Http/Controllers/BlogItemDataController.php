<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\App;

class BlogItemDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($slug, $locale = 'hy')
    {
        App::setLocale($locale);
        $blog = new \stdClass();
        $blog->blog_item = Blog::withTranslation()->where('slug',$slug)->first();
        $similar_blogs = Blog::withTranslation()
            ->where('slug', '<>', $slug)
            ->orderBy('id', 'desc')
            ->take(3)
            ->get();
        foreach($similar_blogs as $blog) {
            $html_reg = '/<+\s*\/*\s*([A-Z][A-Z0-9]*)\b[^>]*\/*\s*>+/i';
            $special_char_reg = '/&(lt|gt|nbsp|quot|amp|apos|amp;laquo|amp;raquo|laquo|raquo|times|shy);/i';
            $blog->description = htmlentities(preg_replace($html_reg, '', $blog->description ));
            $blog->description = preg_replace($special_char_reg, '', $blog->description );
        }
        $blog->similar_blogs = $similar_blogs;
        return response()->json($blog);
    }

    public function likes($slug, $action)
    {
        $blog = Blog::withTranslation()->where('slug',$slug)->first();
        if ($action === "add") {
            $blog->update([
                'likes' => $blog->likes+1
            ]);
        }
        else {
            $blog->update([
                'likes' => $blog->likes-1
            ]);
        }
        return response()->json("1");
    }
}
