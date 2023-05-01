<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends BaseModel
{
    protected $fillable = [
        'date',
        'status',
        'user_id'
    ];
    use HasFactory;
}
