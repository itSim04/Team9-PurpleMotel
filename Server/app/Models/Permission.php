<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;
    protected $fillable = [
        'concerned_party',
        'is_singular',
        'label',
        'read',
        'write',
        'delete'
    ];
}
