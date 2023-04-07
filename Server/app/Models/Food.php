<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $fillable = [
        'label',
        'description',
        'price',
        'is_served',
    ];
    use HasFactory;
}
