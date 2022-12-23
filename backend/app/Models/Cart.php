<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tissue',
        'quantity',
        'template_name',
        'template_id',
        'annex'
    ];

    protected $hidden = [
        'user_id'
    ];
}
