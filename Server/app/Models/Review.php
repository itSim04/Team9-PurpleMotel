<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [

        'room_id',
        'user_id',
        'stars',
        'date',
        'title',
        'content'


    ];

    protected $dispatchesEvents = [

        'created' => \App\Events\ReviewCreated::class,

    ];
}
