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
        Schema::create('sister_schools', function (Blueprint $table) {
            $table->id();
            $table->string('name', 70)->unique();
            $table->string('short_name', 50)->unique();
            $table->string('slug', 50)->unique();
            $table->string('logo');
            $table->string('logo_b');
            $table->string('address');
            $table->string('email');
            $table->string('phone');
            $table->string('website_url');
            $table->longText('introduction');
            $table->longText('description');
            $table->longText('hos_message');
            $table->string('hos_image');
            $table->string('hos_name', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sister_schools');
    }
};
