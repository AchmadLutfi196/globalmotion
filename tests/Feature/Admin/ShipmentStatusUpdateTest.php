<?php

namespace Tests\Feature\Admin;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated admin can update shipment status', function () {
    $user = User::factory()->create();
    $shipment = Shipment::create([
        'tracking_number' => 'GM12345678',
        'service_type' => 'Reguler',
        'origin' => 'Jakarta',
        'destination' => 'Surabaya',
        'weight' => 2,
        'koli' => 1,
        'total_price' => 20000,
        'status' => 'pending',
    ]);

    $response = $this->actingAs($user)
        ->post(route('admin.shipments.update-status', $shipment), [
            'status' => 'picked_up',
            'location' => 'Jakarta Warehouse',
            'timestamp' => now()->toDateTimeString(),
            'description' => 'Shipment has been picked up by the courier',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('shipments', [
        'id' => $shipment->id,
        'status' => 'picked_up',
    ]);
    $this->assertDatabaseHas('shipment_events', [
        'shipment_id' => $shipment->id,
        'status' => 'picked_up',
        'location' => 'Jakarta Warehouse',
    ]);
});

test('unauthenticated user cannot update shipment status', function () {
    $shipment = Shipment::create([
        'tracking_number' => 'GM12345678',
        'service_type' => 'Reguler',
        'origin' => 'Jakarta',
        'destination' => 'Surabaya',
        'weight' => 2,
        'koli' => 1,
        'total_price' => 20000,
        'status' => 'pending',
    ]);

    $response = $this->post(route('admin.shipments.update-status', $shipment), [
        'status' => 'picked_up',
        'location' => 'Jakarta Warehouse',
        'timestamp' => now()->toDateTimeString(),
    ]);

    $response->assertRedirect();
});

test('validation errors for shipment status update', function () {
    $user = User::factory()->create();
    $shipment = Shipment::create([
        'tracking_number' => 'GM12345678',
        'service_type' => 'Reguler',
        'origin' => 'Jakarta',
        'destination' => 'Surabaya',
        'weight' => 2,
        'koli' => 1,
        'total_price' => 20000,
        'status' => 'pending',
    ]);

    $response = $this->actingAs($user)
        ->post(route('admin.shipments.update-status', $shipment), [
            'status' => 'Invalid Status',
            'location' => '',
            'timestamp' => 'not-a-date',
        ]);

    $response->assertSessionHasErrors(['status', 'location', 'timestamp']);
});
