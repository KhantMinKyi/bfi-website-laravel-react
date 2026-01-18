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
        Schema::create('alumnis', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('banner')->nullable();
            $table->longText('introduction');
            $table->longText('body')->nullable();
            $table->longText('footer')->nullable();
            $table->string('website_url')->nullable();
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
        Schema::dropIfExists('alumnis');
    }
};
