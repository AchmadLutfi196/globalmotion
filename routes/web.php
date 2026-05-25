<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/services', 'services')->name('services');
Route::inertia('/tracking', 'tracking')->name('tracking');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';

use App\Http\Controllers\Admin\ShipmentController;
use App\Http\Controllers\Admin\PricingController;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/shipments', [ShipmentController::class, 'index'])->name('shipments.index');
    Route::get('/shipments/create', [ShipmentController::class, 'create'])->name('shipments.create');
    Route::post('/shipments', [ShipmentController::class, 'store'])->name('shipments.store');
    Route::get('/shipments/{shipment}', [ShipmentController::class, 'show'])->name('shipments.show');

    Route::get('/pricing', [PricingController::class, 'index'])->name('pricing.index');
    Route::put('/pricing/{pricing}', [PricingController::class, 'update'])->name('pricing.update');
});
