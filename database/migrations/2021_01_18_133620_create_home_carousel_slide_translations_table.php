<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHomeCarouselSlideTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_carousel_slide_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('home_carousel_slide_id');
            $table->string('locale')->index();
            $table->string('title');
            $table->text('sub_title');
            $table->text('description');

            $table->unique(['home_carousel_slide_id', 'locale'], 'home_slide_translations_locale_unique');
            $table->foreign('home_carousel_slide_id')->references('id')->on('home_carousel_slides')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('home_carousel_slide_translations');
    }
}
