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
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('function');
            $table->string('campus')->nullable();
            $table->string('sub_function');
            $table->enum('gender', ['Male', 'Female', 'Both'])->default('Both');
            $table->enum('experience_level', ['Entry Level', 'Experienced Non-Manager', 'Manager', 'Director and Above']);
            $table->enum('education_level', ['High School Diploma', 'Associate Degree', 'Bachelor`s Degree', 'Master`s Degree', 'Doctorate (Ph.D.)']);
            $table->integer('number_of_post');
            $table->enum('type', ['Full Time', 'Part Time', 'Temp/Contract', 'Voluntary', 'Internship', 'Project Specific']);
            $table->enum('computer_skill', ['Beginner', 'Intermediate', 'Advanced']);
            $table->enum('industry', ['IT/Computer', 'Banking/Insurance/Microfinance', 'Education/Training', 'Telecommunications', 'Construction/Building/Architecture', 'Medical/Hospital', 'Advertising/PR/Marketing', 'Accounting', 'Recruitment']);
            $table->integer('maximun_salary');
            $table->boolean('is_hide_salary');
            $table->enum('employee_type', ['Local', 'Foreigner', 'Both'])->default('Both');
            $table->string('email');
            $table->longText('description');
            $table->longText('requirement');
            $table->text('benefits');
            $table->text('highlights');
            $table->text('career_growth');
            $table->boolean('is_active')->default(1);
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
        Schema::dropIfExists('job_posts');
    }
};
