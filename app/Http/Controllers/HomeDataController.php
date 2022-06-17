<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\HomeCarouselSlide;
use App\Models\Blog;
use App\Models\NewsItem;
use App\Models\Partner;
use Illuminate\Support\Facades\App;
use App\Models\MetaDescription;

class HomeDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($locale = 'hy')
    {
        $html_reg = '/<+\s*\/*\s*([A-Z][A-Z0-9]*)\b[^>]*\/*\s*>+/i';
        $special_char_reg = '/&(lt|gt|quot|amp|apos|laquo|raquo|times|shy);/i';
        $special_char_reg_two = '/(lt|gt|quot|amp|apos|laquo|raquo|times);/i';
        $special_char_reg_three = '/nbsp;/i';

        App::setLocale($locale);
        $data = new \stdClass();
        $data->services = Service::withTranslation()->get();
        $data->home_carousel_slides = HomeCarouselSlide::withTranslation()->get();
        $data->meta_description = MetaDescription::withTranslation()->where("page", "home")->first()->name;
        $data->partners = Partner::get();
        $blogs = Blog::withTranslation()->get();
        foreach($blogs as $blog) {
            $blog->description = htmlentities(preg_replace( $html_reg, '', $blog->description ));
            $blog->description = preg_replace($special_char_reg, '', $blog->description );
            $blog->description = preg_replace($special_char_reg_two, '', $blog->description );
            $blog->description = preg_replace($special_char_reg_three, ' ', $blog->description);
        }
        $data->blogs = $blogs;
        $news_items = NewsItem::withTranslation()->orderBy('id', 'desc')->get();
        foreach($news_items as $news_item) {
            $news_item->description = htmlentities(preg_replace( $html_reg, '', $news_item->description ));
            $news_item->description = preg_replace($special_char_reg, '', $news_item->description );
            $news_item->description = preg_replace($special_char_reg_two, '', $news_item->description );
            $news_item->description = preg_replace($special_char_reg_three, ' ', $news_item->description);
        }
        $data->news_items = $news_items;
        return response()->json($data);
    }

    public function get_item($slug, $locale = 'hy')
    {
        App::setLocale($locale);
        $home_carousel_slide = HomeCarouselSlide::withTranslation()->where('slug',$slug)->first();
        return response()->json($home_carousel_slide);
    }
}
