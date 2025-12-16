<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CurriculumPhoto extends Model
{
    protected $fillable = [
        'curriculum_id',
        'image',
        'title',
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
    public function curriculum()
    {
        return $this->belongsTo(Curriculum::class);
    }
}
