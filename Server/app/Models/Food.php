<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends BaseModel
{
    protected $fillable = [
        'label',
        'description',
        'price',
        'is_served',
    ];
    protected $table = 'Foods';
    use HasFactory;
}
