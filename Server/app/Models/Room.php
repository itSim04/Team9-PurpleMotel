<?php

namespace App\Models;

use App\Events\CustomEvent;
use App\Mail\SendTriggerEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

/**
 * Summary of Room
 */
class Room extends Model
{
    use HasFactory;

    protected $dispatchesEvents = [
        'saved' => CustomEvent::class
    ];
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
