<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{


    protected $fillable = [
        'post_type_id',
        'title',
        'subtitle',
        'description',
        'footer_description',
        'banner_img',
        'images',
        'start_date',
        'end_date',
        'registration_fee',
        'award_description',
        'video_url',
        'location',
        'created_user_id',
        'updated_user_id',
        'status',
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(PostType::class, 'post_type_id', 'id');
    }

    public function category_tags(): HasMany
    {
        return $this->hasMany(PostCategoryTag::class);
    }

    public function created_user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_user_id');
    }

    public function updated_user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_user_id');
    }
}
