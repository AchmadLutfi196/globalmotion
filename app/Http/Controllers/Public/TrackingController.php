<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackingController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('number')) {
            return redirect()->route('tracking.show', $request->query('number'));
        }

        return Inertia::render('tracking');
    }

    public function show($tracking_number)
    {
        $shipment = Shipment::with('events')
            ->where('tracking_number', $tracking_number)
            ->first();

        if (!$shipment) {
            return Inertia::render('tracking', [
                'error' => 'Shipment not found'
            ]);
        }

        return Inertia::render('tracking', [
            'shipment' => $shipment
        ]);
    }
}
