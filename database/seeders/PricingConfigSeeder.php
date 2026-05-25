<?php

namespace Database\Seeders;

use App\Models\PricingConfig;
use Illuminate\Database\Seeder;

class PricingConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configs = [
            [
                'service_type' => 'Air',
                'rate_per_kg' => 50000,
                'handling_fee_per_koli' => 5000,
                'min_weight' => 1.0,
            ],
            [
                'service_type' => 'Sea',
                'rate_per_kg' => 15000,
                'handling_fee_per_koli' => 2000,
                'min_weight' => 10.0,
            ],
            [
                'service_type' => 'Land',
                'rate_per_kg' => 10000,
                'handling_fee_per_koli' => 1000,
                'min_weight' => 5.0,
            ],
        ];

        foreach ($configs as $config) {
            PricingConfig::updateOrCreate(
                ['service_type' => $config['service_type']],
                $config
            );
        }
    }
}
