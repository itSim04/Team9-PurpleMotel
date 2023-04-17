<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordResetTokens extends BaseModel
{
    use HasFactory;

    const UPDATED_AT = null;
    protected $primaryKey = 'email';

    protected $fillable = [

        'email',
        'token',
        'created_at'

    ];
}
