<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends BaseModel
{
    use HasFactory;
    protected $fillable = [
        'change',
        'start_date',
        'end_date'
    ];
}
