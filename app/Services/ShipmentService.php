<?php

namespace App\Services;

use App\Models\PricingConfig;
use App\Models\Shipment;
use Illuminate\Support\Str;
use InvalidArgumentException;

class ShipmentService
{
    /**
     * Volumetric divisor (standard air freight: 6000, general: 4000).
     */
    const VOLUMETRIC_DIVISOR = 4000;

    /**
     * Calculate volumetric weight from dimensions.
     * Formula: (P x L x T) / divisor x koli
     */
    public function calculateVolumetricWeight(float $length, float $width, float $height, int $koli): float
    {
        return ($length * $width * $height) / self::VOLUMETRIC_DIVISOR * $koli;
    }

    /**
     * Determine chargeable weight: max(actual_weight, volumetric_weight, min_weight).
     */
    public function calculateChargeableWeight(
        float $actualWeight,
        float $volumetricWeight,
        float $minWeight
    ): float {
        return max($actualWeight, $volumetricWeight, $minWeight);
    }

    /**
     * Calculate shipment price based on service type, chargeable weight, and koli.
     *
     * @throws InvalidArgumentException
     */
    public function calculatePrice(string $serviceType, float $chargeableWeight, int $koli): float
    {
        $config = PricingConfig::where('service_type', $serviceType)->first();

        if (!$config) {
            throw new InvalidArgumentException("Pricing configuration not found for service type: {$serviceType}");
        }

        $price = ($chargeableWeight * (float) $config->rate_per_kg)
               + ($koli * (float) $config->handling_fee_per_koli);

        return (float) $price;
    }

    /**
     * Full price calculation from raw inputs.
     * Returns array with all weight breakdown and final price.
     */
    public function calculatePriceFromInputs(
        string $serviceType,
        float $weight,
        int $koli,
        ?float $length = null,
        ?float $width = null,
        ?float $height = null
    ): array {
        $config = PricingConfig::where('service_type', $serviceType)->first();

        if (!$config) {
            throw new InvalidArgumentException("Pricing configuration not found for service type: {$serviceType}");
        }

        $minWeight = (float) $config->min_weight;

        // Volumetric weight (only if dimensions provided)
        $volumetricWeight = 0.0;
        if ($length && $width && $height) {
            $volumetricWeight = $this->calculateVolumetricWeight($length, $width, $height, $koli);
        }

        $chargeableWeight = $this->calculateChargeableWeight($weight, $volumetricWeight, $minWeight);
        $totalPrice = $this->calculatePrice($serviceType, $chargeableWeight, $koli);

        return [
            'actual_weight'      => $weight,
            'volumetric_weight'  => $volumetricWeight,
            'chargeable_weight'  => $chargeableWeight,
            'total_price'        => $totalPrice,
        ];
    }

    /**
     * Generate a unique tracking number with prefix GM-.
     */
    public function generateUniqueTrackingNumber(): string
    {
        do {
            $trackingNumber = 'GM-' . strtoupper(Str::random(7));
        } while (Shipment::where('tracking_number', $trackingNumber)->exists());

        return $trackingNumber;
    }
}
