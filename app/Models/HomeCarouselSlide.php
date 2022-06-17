<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;

class HomeCarouselSlide extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    public $timestamps = true;
    protected $fillable = [
        'desktop_image',
        'mobile_image',
        'slug'
    ];
    public $translatedAttributes = ["title", "sub_title", "description"];
}
