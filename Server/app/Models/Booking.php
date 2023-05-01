<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends BaseModel
{
    use HasFactory;
    protected $fillable = [
        'room_id',
        'user_id',
        'check_in',
        'end_date',
        'promo_id',
        'exhausted'
    ];
}
