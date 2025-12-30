<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityServiceActivity extends Model
{
    protected $fillable = [
        'title',
        'image',
        'date',
        'is_donation',
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
}
