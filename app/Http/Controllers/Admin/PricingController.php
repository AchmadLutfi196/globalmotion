<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PricingConfig;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PricingController extends Controller
{
    /**
     * Display a listing of the pricing configurations.
     */
    public function index(): Response
    {
        $pricingConfigs = PricingConfig::all();

        return Inertia::render('Admin/Pricing/Index', [
            'pricingConfigs' => $pricingConfigs,
        ]);
    }

    /**
     * Update the specified pricing configuration.
     */
    public function update(Request $request, PricingConfig $pricing): RedirectResponse
    {
        $validated = $request->validate([
            'rate_per_kg' => 'required|numeric|min:0',
            'handling_fee_per_koli' => 'required|numeric|min:0',
            'min_weight' => 'required|numeric|min:0',
        ]);

        $pricing->update($validated);

        return redirect()->route('admin.pricing.index')
            ->with('success', "Pricing for {$pricing->service_type} updated successfully.");
    }
}
