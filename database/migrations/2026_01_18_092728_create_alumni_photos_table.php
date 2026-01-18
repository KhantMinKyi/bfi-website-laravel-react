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
        Schema::create('alumni_photos', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('title', 100)->nullable();
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumni_photos');
    }
};
