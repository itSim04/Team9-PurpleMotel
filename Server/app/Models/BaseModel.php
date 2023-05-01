<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Events\CustomCreateEvent;
use App\Events\CustomDeleteEvent;
use App\Events\CustomUpdateEvent;


class BaseModel extends Model
{
    use HasFactory;
    protected $dispatchesEvents = [
        'updated' => CustomUpdateEvent::class,
        'created' => CustomCreateEvent::class,
        'deleted'=> CustomDeleteEvent::class
    ];
}
