<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intel extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'user_id',
        'quiet',
        'smoke',
        'view',
        'wifi',
        'tv',
        'layout',
        'proximity',
        'bed',
        'bathroom',
    ];
}
