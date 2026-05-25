<?php

namespace App\Services;

use App\Models\PricingConfig;
use App\Models\Shipment;
use Illuminate\Support\Str;
use InvalidArgumentException;

class ShipmentService
{
    /**
     * Calculate shipment price based on service type, weight, and koli.
     *
     * @param string $serviceType
     * @param float $weight
     * @param int $koli
     * @return float
     * @throws InvalidArgumentException
     */
    public function calculatePrice(string $serviceType, float $weight, int $koli): float
    {
        $config = PricingConfig::where('service_type', $serviceType)->first();

        if (!$config) {
            throw new InvalidArgumentException("Pricing configuration not found for service type: {$serviceType}");
        }

        $billableWeight = max($weight, (float) $config->min_weight);

        $price = ($billableWeight * (float) $config->rate_per_kg) + ($koli * (float) $config->handling_fee_per_koli);

        return (float) $price;
    }

    /**
     * Generate a unique tracking number with prefix GM-.
     *
     * @return string
     */
    public function generateUniqueTrackingNumber(): string
    {
        do {
            $trackingNumber = 'GM-' . strtoupper(Str::random(7));
        } while (Shipment::where('tracking_number', $trackingNumber)->exists());

        return $trackingNumber;
    }
}
