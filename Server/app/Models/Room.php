<?php

namespace App\Models;

use App\Mail\SendTriggerEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

/**
 * Summary of Room
 */
class Room extends BaseModel
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

    public function intels()
    {
        return $this->hasMany(Intel::class);
    }
    
}
