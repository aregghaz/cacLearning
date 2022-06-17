<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MetaDescriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $first_pages = ["home", "about-us", "contact-us", "news", "blogs" ];
        $locales = ["hy", "ru", "en"];
        foreach ($first_pages as $k => $page) {
            DB::table("meta_descriptions")->insert([
                'page' => $page,
            ]);
            foreach ($locales as $locale) {
                DB::table("meta_description_translations")->insert([
                    "meta_description_id" => $k+1,
                    'name' => 'LAO',
                    'locale' => $locale
                ]);
            }
        }
    }
}
