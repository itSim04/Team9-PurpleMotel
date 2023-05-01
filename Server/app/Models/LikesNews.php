<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikesNews extends Model
{
    use HasFactory;

    protected $fillable = [

        'user_id',
        'news_id'

    ];

    protected $dispatchesEvents = [

        'created' => \App\Events\LikesNewsCreated::class,
        'deleted' => \App\Events\LikesNewsDeleted::class

    ];
}
