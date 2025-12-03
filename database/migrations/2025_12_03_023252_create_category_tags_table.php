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
        Schema::create('category_tags', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->enum('type', ['category', 'tag']);
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
        Schema::dropIfExists('category_tags');
    }
};
