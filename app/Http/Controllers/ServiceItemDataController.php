<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\App;

class ServiceItemDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($locale = 'hy')
    {
        App::setLocale($locale);
        $service = Service::withTranslation()->where('slug',$slug)->first();
        return response()->json($service);
    }
}
