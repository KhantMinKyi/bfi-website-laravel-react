<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostCategoryTag extends Model
{
    protected $fillable = [
        'category_tag_id',
        'post_id',
    ];

    public function category_tag(): BelongsTo
    {
        return $this->belongsTo(CategoryTag::class, 'category_tag_id');
    }
    // public function posts()
    // {
    //     return $this->belongsToMany(Post::class, 'post_category_tags', 'category_tag_id', 'post_id');
    // }
}
