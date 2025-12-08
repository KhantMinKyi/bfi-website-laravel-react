<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sister_school_banners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sister_school_id')->constrained('sister_schools');
            $table->string('banner_image');
            $table->string('title', 70);
            $table->string('top_sub_title', 50);
            $table->string('bottom_sub_title', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sister_school_banners');
    }
};
