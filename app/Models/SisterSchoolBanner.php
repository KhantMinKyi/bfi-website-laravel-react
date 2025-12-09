<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SisterSchoolBanner extends Model
{
    protected $fillable = [
        'sister_school_id',
        'banner_image',
        'title',
        'top_sub_title',
        'bottom_sub_title',
        'created_user_id',
        'updated_user_id',
    ];
    public function sister_school(): BelongsTo
    {
        return $this->belongsTo(SisterSchool::class);
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
