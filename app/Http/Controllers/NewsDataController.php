<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsItem;
use Illuminate\Support\Facades\App;
use App\Models\MetaDescription;

class NewsDataController extends Controller
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
        $data->meta_description = MetaDescription::withTranslation()->where("page", "news")->first()->name;
        $news = NewsItem::withTranslation()->orderBy('id', 'desc')->get();
        foreach($news as $news_item) {
            $html_reg = '/<+\s*\/*\s*([A-Z][A-Z0-9]*)\b[^>]*\/*\s*>+/i';
            $special_char_reg = '/&(lt|gt|quot|amp|apos|laquo|raquo|times|shy);/i';
            $special_char_reg_two = '/(lt|gt|quot|amp|apos|laquo|raquo|times);/i';
            $special_char_reg_three = '/nbsp;/i';

            $news_item->description = htmlentities(preg_replace( $html_reg, '', $news_item->description ));
            $news_item->description = preg_replace($special_char_reg, '', $news_item->description );
            $news_item->description = preg_replace($special_char_reg_two, '', $news_item->description );
            $news_item->description = preg_replace($special_char_reg_three, ' ', $news_item->description);
        }
        $data->news = $news;
        return response()->json($data);
    }
}
