<?php

namespace App\Models;

use App\Events\CustomCreateEvent;
use App\Events\CustomDeleteEvent;
use App\Events\CustomUpdateEvent;
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
        'updated' => CustomUpdateEvent::class,
        'created' => CustomCreateEvent::class,
        'deleted'=> CustomDeleteEvent::class
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
