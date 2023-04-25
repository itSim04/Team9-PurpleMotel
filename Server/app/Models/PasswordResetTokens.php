<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordResetTokens extends Model
{
    use HasFactory;

    const UPDATED_AT = null;
    protected $primaryKey = 'token';

    public $incrementing = false;

    protected $fillable = [

        'email',
        'token',
        'created_at'

    ];
}
