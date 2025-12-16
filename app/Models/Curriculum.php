<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    protected $fillable = [
        'name',
        'sub_title',
        'slug',
        'logo',
        'secondary_logo',
        'introduction',
        'body',
        'footer',
        'created_user_id',
        'updated_user_id',
    ];

    public function created_user()
    {
        return $this->belongsTo(User::class, 'created_user_id');
    }
    public function updated_user()
    {
        return $this->belongsTo(User::class, 'updated_user_id');
    }
    public function related_photos()
    {
        return $this->hasMany(CurriculumPhoto::class, 'curriculum_id', 'id');
    }
}
