<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAboutUsContentTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('about_us_content_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('about_us_content_id');
            $table->string('locale')->index();
            $table->text('page_content');

            $table->unique(['about_us_content_id', 'locale'], 'about_us_translations_locale_unique');
            $table->foreign('about_us_content_id')->references('id')->on('about_us_contents')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('about_us_content_translations');
    }
}
