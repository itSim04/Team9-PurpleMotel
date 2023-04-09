<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    use HasFactory;
    protected $fillable = [

        'label',
        'price',
        'description',
        'adults_capacity',
        'adults_with_kids_capacity',
        'kids_capacity',

    ];
}
