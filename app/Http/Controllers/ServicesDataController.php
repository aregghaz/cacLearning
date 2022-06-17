<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\App;

class ServicesDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($locale = 'hy')
    {
        App::setLocale($locale);
        $services = Service::withTranslation()->get();
        return response()->json($services);
    }
}
