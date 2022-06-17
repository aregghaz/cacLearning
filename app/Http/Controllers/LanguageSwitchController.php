<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LanguageSwitchController extends Controller
{
    public function index($locale) {
        if (!in_array($locale, config('translatable.locales'))) {
            abort(400);
        }

        App::setLocale($locale);

        return response()->json("1");
    }
}
