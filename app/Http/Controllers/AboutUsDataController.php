<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AboutUsContent;
use App\Models\MetaDescription;

use Illuminate\Support\Facades\App;

class AboutUsDataController extends Controller
{
    /**
     * Display content on site
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($locale = 'hy')
    {
        App::setLocale($locale);
        $data = new \stdClass();
        $data->page_content = AboutUsContent::first()->page_content;
        $data->meta_description = MetaDescription::withTranslation()->where("page", "about-us")->first()->name;
        return response()->json($data);
    }
}
