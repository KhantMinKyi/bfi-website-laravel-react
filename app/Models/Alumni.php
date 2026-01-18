<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    protected $fillable = [
        'title',
        'banner',
        'introduction',
        'body',
        'footer',
        'website_url',
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
