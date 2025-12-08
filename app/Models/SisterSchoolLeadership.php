<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SisterSchoolLeadership extends Model
{
    protected $fillable = [
        'sister_school_id',
        'image',
        'name',
        'position',
    ];
    public function sister_school(): BelongsTo
    {
        return $this->belongsTo(SisterSchool::class);
    }
}
