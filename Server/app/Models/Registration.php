<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends BaseModel
{
    use HasFactory;
    protected $fillable = [
        'activity_id',
        'user_id',
        'start_date',
        'end_date',
        'seats'
    ];
}
