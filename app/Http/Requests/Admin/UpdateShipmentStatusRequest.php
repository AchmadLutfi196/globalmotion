<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateShipmentStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['required', 'string', Rule::in([
                'pending', 'picked_up', 'in_transit', 'arrived_at_hub', 'out_for_delivery', 'delivered', 'cancelled'
            ])],
            'location' => ['required', 'string', 'max:255'],
            'timestamp' => ['required', 'date'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
