<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;
use Database\Seeders\MetaDescriptionsSeeder;

class CreateMetaDescriptionTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meta_description_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('meta_description_id');
            $table->string('locale')->index();
            $table->string("name");
            $table->timestamps();

            $table->unique(['meta_description_id', 'locale'], 'meta_translations_locale_unique');
            $table->foreign('meta_description_id')->references('id')->on('meta_descriptions')->onDelete('cascade');
        });

        Artisan::call('db:seed', [
            '--class' => MetaDescriptionsSeeder::class
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meta_description_translations');
    }
}
