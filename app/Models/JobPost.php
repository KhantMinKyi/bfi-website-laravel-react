<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobPost extends Model
{
    protected $fillable = [
        'title',
        'function',
        'campus',
        'sub_function',
        'gender',
        'experience_level',
        'education_level',
        'number_of_post',
        'type',
        'computer_skill',
        'industry',
        'maximun_salary',
        'is_hide_salary',
        'employee_type',
        'email',
        'description',
        'requirement',
        'benefits',
        'highlights',
        'career_growth',
        'is_active',
        'created_user_id',
        'updated_user_id',
    ];


    public function created_user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_user_id');
    }

    public function updated_user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_user_id');
    }
}
