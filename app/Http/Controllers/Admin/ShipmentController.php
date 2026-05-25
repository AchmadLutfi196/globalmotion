<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreShipmentRequest;
use App\Models\PricingConfig;
use App\Models\Shipment;
use App\Models\ShipmentEvent;
use App\Services\ShipmentService;
use Illuminate\Http\RedirectResponse;
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
        $shipments = Shipment::latest()->paginate(10);

        return Inertia::render('Admin/Shipments/Index', [
            'shipments' => $shipments,
        ]);
    }

    /**
     * Show the form for creating a new shipment.
     */
    public function create(): Response
    {
        $pricingConfigs = PricingConfig::all();

        return Inertia::render('Admin/Shipments/Create', [
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
        $totalPrice = $this->shipmentService->calculatePrice(
            $validated['service_type'],
            $validated['weight'],
            $validated['koli']
        );

        $shipment = Shipment::create([
            'tracking_number' => $trackingNumber,
            'service_type' => $validated['service_type'],
            'origin' => $validated['origin'],
            'destination' => $validated['destination'],
            'weight' => $validated['weight'],
            'koli' => $validated['koli'],
            'total_price' => $totalPrice,
            'status' => 'Pending',
        ]);

        // Create initial event
        $shipment->events()->create([
            'location' => $validated['origin'],
            'status' => 'Pending',
            'description' => 'Shipment created',
            'timestamp' => now(),
        ]);

        return redirect()->route('admin.shipments.index')
            ->with('success', 'Shipment created successfully.');
    }

    /**
     * Display the specified shipment.
     */
    public function show(Shipment $shipment): Response
    {
        return Inertia::render('Admin/Shipments/Show', [
            'shipment' => $shipment->load('events'),
        ]);
    }
}
