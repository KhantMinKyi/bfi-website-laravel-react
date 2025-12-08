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
    ];
    public function sister_school(): BelongsTo
    {
        return $this->belongsTo(SisterSchool::class);
    }
}
