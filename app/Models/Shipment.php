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
        // Sender
        'sender_name',
        'sender_phone',
        'sender_address',
        // Receiver
        'receiver_name',
        'receiver_phone',
        'receiver_address',
        // Shipment details
        'service_type',
        'origin',
        'destination',
        'weight',
        'koli',
        'length',
        'width',
        'height',
        'volumetric_weight',
        'chargeable_weight',
        'total_price',
        // Payment
        'payment_method',
        'payment_status',
        'billing_notes',
        // Status & delivery
        'status',
        'estimated_delivery',
        // POD
        'pod_photo',
        'pod_receiver_name',
        // Notes
        'notes',
    ];

    protected $casts = [
        'weight'             => 'decimal:2',
        'length'             => 'decimal:2',
        'width'              => 'decimal:2',
        'height'             => 'decimal:2',
        'volumetric_weight'  => 'decimal:2',
        'chargeable_weight'  => 'decimal:2',
        'total_price'        => 'decimal:2',
        'estimated_delivery' => 'datetime',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(ShipmentEvent::class)->orderByDesc('timestamp');
    }
}
