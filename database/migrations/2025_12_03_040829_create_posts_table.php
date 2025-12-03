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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_type_id')->constrained();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->longText('description');
            $table->longText('footer_description')->nullable();
            $table->string('banner_img');
            $table->longText('images')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('registration_fee', 100)->nullable();
            $table->longText('award_description')->nullable();
            $table->string('video_url')->nullable();
            $table->string('location', 100)->nullable();
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->nullable()->constrained('users');
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
