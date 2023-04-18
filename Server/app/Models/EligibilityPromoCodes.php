<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EligibilityPromoCodes extends Model
{
    use HasFactory;

    protected $fillable = [

        'promo_id' ,
        'effect_id',
        'type'

    ];
}
