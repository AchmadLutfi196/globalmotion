<?php

use App\Models\PricingConfig;
use App\Models\Shipment;
use App\Services\ShipmentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->shipmentService = new ShipmentService();
});

test('it calculates price correctly when weight is above min weight', function () {
    PricingConfig::create([
        'service_type' => 'REGULAR',
        'rate_per_kg' => 10000,
        'handling_fee_per_koli' => 5000,
        'min_weight' => 1.0,
    ]);

    $price = $this->shipmentService->calculatePrice('REGULAR', 5.5, 2);

    // (5.5 * 10000) + (2 * 5000) = 55000 + 10000 = 65000
    expect($price)->toBe(65000.0);
});

test('it calculates price correctly when weight is below min weight', function () {
    PricingConfig::create([
        'service_type' => 'REGULAR',
        'rate_per_kg' => 10000,
        'handling_fee_per_koli' => 5000,
        'min_weight' => 2.0,
    ]);

    $price = $this->shipmentService->calculatePrice('REGULAR', 1.0, 1);

    // min_weight is 2.0, so billable_weight = 2.0
    // (2.0 * 10000) + (1 * 5000) = 20000 + 5000 = 25000
    expect($price)->toBe(25000.0);
});

test('it calculates price correctly with different koli count', function () {
    PricingConfig::create([
        'service_type' => 'EXPRESS',
        'rate_per_kg' => 20000,
        'handling_fee_per_koli' => 10000,
        'min_weight' => 1.0,
    ]);

    $price = $this->shipmentService->calculatePrice('EXPRESS', 2.0, 5);

    // (2.0 * 20000) + (5 * 10000) = 40000 + 50000 = 90000
    expect($price)->toBe(90000.0);
});

test('it throws exception when pricing config is missing', function () {
    expect(fn() => $this->shipmentService->calculatePrice('NON_EXISTENT', 1.0, 1))
        ->toThrow(InvalidArgumentException::class, "Pricing configuration not found for service type: NON_EXISTENT");
});

test('it generates unique tracking number in correct format', function () {
    $trackingNumber = $this->shipmentService->generateUniqueTrackingNumber();

    expect($trackingNumber)->toStartWith('GM-');
    expect(strlen($trackingNumber))->toBe(10); // GM- (3) + 7 random = 10
    expect(substr($trackingNumber, 3))->toMatch('/^[A-Z0-9]{7}$/');
});

test('it ensures generated tracking number is unique', function () {
    // Pre-create a shipment with a specific tracking number
    $existingTrackingNumber = 'GM-EXISTING';
    Shipment::create([
        'tracking_number' => $existingTrackingNumber,
        'service_type' => 'REGULAR',
        'origin' => 'Jakarta',
        'destination' => 'Bandung',
        'weight' => 1.0,
        'koli' => 1,
        'total_price' => 10000,
        'status' => 'PENDING',
    ]);

    // Verify it returns a tracking number that doesn't exist yet
    $trackingNumber = $this->shipmentService->generateUniqueTrackingNumber();
    expect(Shipment::where('tracking_number', $trackingNumber)->exists())->toBeFalse();
});
