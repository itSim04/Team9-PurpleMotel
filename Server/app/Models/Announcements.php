<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcements extends BaseModel
{
    use HasFactory;
    protected $fillable = [
        'label',
        'body',
        'concerned_tier',
        'author_id'
    ];
}
