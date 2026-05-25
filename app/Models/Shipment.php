<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shipment extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'tracking_number',
        'service_type',
        'origin',
        'destination',
        'weight',
        'koli',
        'total_price',
        'status',
        'estimated_delivery',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
        'total_price' => 'decimal:2',
        'estimated_delivery' => 'datetime',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(ShipmentEvent::class);
    }
}
