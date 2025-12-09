<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SisterSchool extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'slug',
        'logo',
        'logo_b',
        'address',
        'email',
        'phone',
        'website_url',
        'introduction',
        'description',
        'hos_message',
        'hos_image',
        'hos_name',
        'created_user_id',
        'updated_user_id',
        'status'
    ];

    public function banners(): HasMany
    {
        return $this->hasMany(SisterSchoolBanner::class);
    }
    public function leaderships(): HasMany
    {
        return $this->hasMany(SisterSchoolLeadership::class);
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
