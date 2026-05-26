<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreShipmentRequest;
use App\Http\Requests\Admin\UpdateShipmentStatusRequest;
use App\Models\PricingConfig;
use App\Models\Shipment;
use App\Services\ShipmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ShipmentController extends Controller
{
    public function __construct(
        protected ShipmentService $shipmentService
    ) {}

    /**
     * Display a listing of the shipments.
     */
    public function index(): Response
    {
        $shipments = Shipment::latest()->paginate(20);

        return Inertia::render('admin/shipments/index', [
            'shipments' => $shipments,
        ]);
    }

    /**
     * Show the form for creating a new shipment.
     */
    public function create(): Response
    {
        $pricingConfigs = PricingConfig::all();

        return Inertia::render('admin/shipments/create', [
            'pricingConfigs' => $pricingConfigs,
        ]);
    }

    /**
     * Store a newly created shipment in storage.
     */
    public function store(StoreShipmentRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $trackingNumber = $this->shipmentService->generateUniqueTrackingNumber();

        // Calculate weights and price
        $priceData = $this->shipmentService->calculatePriceFromInputs(
            serviceType: $validated['service_type'],
            weight: (float) $validated['weight'],
            koli: (int) $validated['koli'],
            length: isset($validated['length']) ? (float) $validated['length'] : null,
            width: isset($validated['width']) ? (float) $validated['width'] : null,
            height: isset($validated['height']) ? (float) $validated['height'] : null,
        );

        // Determine payment status based on method
        $paymentStatus = $validated['payment_method'] === 'cash' ? 'paid' : 'unpaid';

        $shipment = Shipment::create([
            'tracking_number'   => $trackingNumber,
            'sender_name'       => $validated['sender_name'],
            'sender_phone'      => $validated['sender_phone'],
            'sender_address'    => $validated['sender_address'],
            'receiver_name'     => $validated['receiver_name'],
            'receiver_phone'    => $validated['receiver_phone'],
            'receiver_address'  => $validated['receiver_address'],
            'service_type'      => $validated['service_type'],
            'origin'            => $validated['origin'],
            'destination'       => $validated['destination'],
            'weight'            => $validated['weight'],
            'koli'              => $validated['koli'],
            'length'            => $validated['length'] ?? null,
            'width'             => $validated['width'] ?? null,
            'height'            => $validated['height'] ?? null,
            'volumetric_weight' => $priceData['volumetric_weight'],
            'chargeable_weight' => $priceData['chargeable_weight'],
            'total_price'       => $priceData['total_price'],
            'payment_method'    => $validated['payment_method'],
            'payment_status'    => $paymentStatus,
            'status'            => 'pending',
            'notes'             => $validated['notes'] ?? null,
        ]);

        // Create initial tracking event
        $shipment->events()->create([
            'location'    => $validated['origin'],
            'status'      => 'pending',
            'description' => 'Shipment registered. Awaiting pickup.',
            'timestamp'   => now(),
        ]);

        return redirect()->route('admin.shipments.show', $shipment)
            ->with('success', "Shipment {$trackingNumber} created successfully.");
    }

    /**
     * Display the specified shipment.
     */
    public function show(Shipment $shipment): Response
    {
        return Inertia::render('admin/shipments/show', [
            'shipment' => $shipment->load('events'),
        ]);
    }

    /**
     * Update the shipment status and add a new tracking event.
     */
    public function updateStatus(UpdateShipmentStatusRequest $request, Shipment $shipment): RedirectResponse
    {
        $validated = $request->validated();

        // Handle photo upload
        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('tracking-photos', 'public');
        }

        $shipment->update([
            'status' => $validated['status'],
        ]);

        // Auto-fill POD receiver name on delivery
        if ($validated['status'] === 'delivered') {
            $shipment->update([
                'pod_receiver_name' => $shipment->receiver_name,
                'pod_photo'         => $photoPath,
            ]);
        }

        $shipment->events()->create([
            'location'    => $validated['location'],
            'status'      => $validated['status'],
            'description' => $validated['description'] ?? "Status updated to {$validated['status']}",
            'photo'       => $photoPath,
            'timestamp'   => $validated['timestamp'],
        ]);

        return redirect()->back()
            ->with('success', 'Shipment status updated successfully.');
    }

    /**
     * Dashboard stats for admin.
     */
    public function dashboard(): Response
    {
        $stats = [
            'total_shipments' => Shipment::count(),
            'pending'         => Shipment::where('status', 'pending')->count(),
            'in_transit'      => Shipment::whereIn('status', ['picked_up', 'in_transit', 'arrived_at_hub', 'out_for_delivery'])->count(),
            'delivered'       => Shipment::where('status', 'delivered')->count(),
        ];

        $recentShipments = Shipment::latest()->limit(6)->get();

        return Inertia::render('admin/dashboard', [
            'stats'           => $stats,
            'recentShipments' => $recentShipments,
        ]);
    }
}
