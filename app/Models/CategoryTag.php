<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryTag extends Model
{
    protected $fillable = [
        'title',
        'type',
        'created_user_id',
        'updated_user_id',
        'status',
    ];

    public function created_user()
    {
        return $this->belongsTo(User::class, 'created_user_id');
    }
    public function updated_user()
    {
        return $this->belongsTo(User::class, 'updated_user_id');
    }
    public function related_posts()
    {
        return $this->hasMany(PostCategoryTag::class, 'category_tag_id', 'id');
    }
}
