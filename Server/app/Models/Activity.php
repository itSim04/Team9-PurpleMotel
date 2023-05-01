<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends BaseModel
{
    use HasFactory;
    protected $fillable=[
        'title',
        'description',
        'price',
        'capacity',
        'start_date',
        'end_date'
    ];
}
