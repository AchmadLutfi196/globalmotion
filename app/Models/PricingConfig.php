<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PricingConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_type',
        'rate_per_kg',
        'handling_fee_per_koli',
        'min_weight',
    ];

    protected $casts = [
        'rate_per_kg' => 'decimal:2',
        'handling_fee_per_koli' => 'decimal:2',
        'min_weight' => 'decimal:2',
    ];
}
