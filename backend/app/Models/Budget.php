<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'template_id',
        'member_id',
        'tissue',
        'quantity',
        'annex',
        'coupon'
    ];
}
