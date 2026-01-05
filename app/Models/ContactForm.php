<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
    protected $fillable = [
        'sender_name',
        'sender_email',
        'sender_phone',
        'sender_messsage',
    ];
}
