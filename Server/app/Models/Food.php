<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $fillable = [
        'label',
        'description',
        'category',
        'price',
        'is_served',
    ];
    protected $table = 'Foods';
    use HasFactory;
}
