<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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
    ];

    public function banners(): HasMany
    {
        return $this->hasMany(SisterSchoolBanner::class);
    }
    public function leaderships(): HasMany
    {
        return $this->hasMany(SisterSchoolLeadership::class);
    }
}
