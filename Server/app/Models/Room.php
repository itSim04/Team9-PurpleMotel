<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Summary of Room
 */
class Room extends Model
{
    use HasFactory;
    protected $fillable=[
        
        'label',
        'description',
        'number',
        'level',
        'type',
        'open',
        'rating'
    ];
    
}
