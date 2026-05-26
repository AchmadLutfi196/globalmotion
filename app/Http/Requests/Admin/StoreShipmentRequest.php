<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreShipmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Sender
            'sender_name'    => 'required|string|max:255',
            'sender_phone'   => 'required|string|max:20',
            'sender_address' => 'required|string|max:1000',

            // Receiver
            'receiver_name'    => 'required|string|max:255',
            'receiver_phone'   => 'required|string|max:20',
            'receiver_address' => 'required|string|max:1000',

            // Shipment
            'service_type' => 'required|string|exists:pricing_configs,service_type',
            'origin'       => 'required|string|max:255',
            'destination'  => 'required|string|max:255',
            'weight'       => 'required|numeric|min:0.1',
            'koli'         => 'required|integer|min:1',

            // Dimensions (optional, for volumetric)
            'length' => 'nullable|numeric|min:0',
            'width'  => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',

            // Payment
            'payment_method' => 'required|in:cash,invoice',

            // Notes
            'notes' => 'nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'sender_name.required'    => 'Sender name is required.',
            'sender_phone.required'   => 'Sender phone is required.',
            'sender_address.required' => 'Sender address is required.',
            'receiver_name.required'    => 'Receiver name is required.',
            'receiver_phone.required'   => 'Receiver phone is required.',
            'receiver_address.required' => 'Receiver address is required.',
            'service_type.exists'     => 'Selected service type is not available.',
        ];
    }
}
