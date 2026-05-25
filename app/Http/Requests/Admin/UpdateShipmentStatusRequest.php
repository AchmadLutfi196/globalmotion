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
                'Pending', 'Picked Up', 'In Transit', 'Arrived at Hub', 'Out for Delivery', 'Delivered', 'Cancelled'
            ])],
            'location' => ['required', 'string', 'max:255'],
            'timestamp' => ['required', 'date'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
