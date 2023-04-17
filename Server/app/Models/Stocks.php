<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stocks extends BaseModel
{
    protected $fillable=[
        'label',
        'description',
        'available_quantity',
        'is_ingredient'
    ];
    use HasFactory;
}
