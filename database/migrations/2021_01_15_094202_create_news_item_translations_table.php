<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsItemTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_item_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('news_item_id');
            $table->string('locale')->index();
            $table->text('title');
            $table->text('description');

            $table->unique(['news_item_id', 'locale']);
            $table->foreign('news_item_id')->references('id')->on('news_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news_item_translations');
    }
}
