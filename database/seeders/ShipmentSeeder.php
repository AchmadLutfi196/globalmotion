<?php

namespace Database\Seeders;

use App\Models\Shipment;
use App\Models\ShipmentEvent;
use App\Services\ShipmentService;
use Illuminate\Database\Seeder;

class ShipmentSeeder extends Seeder
{
    public function run(): void
    {
        $service = new ShipmentService();

        $shipments = [
            // 1 — Delivered (Air)
            [
                'data' => [
                    'sender_name'      => 'PT Maju Bersama',
                    'sender_phone'     => '021-5551234',
                    'sender_address'   => 'Jl. Sudirman No. 45, Jakarta Pusat, DKI Jakarta',
                    'receiver_name'    => 'Budi Santoso',
                    'receiver_phone'   => '08123456789',
                    'receiver_address' => 'Jl. Pemuda No. 12, Surabaya, Jawa Timur',
                    'service_type'     => 'Air',
                    'origin'           => 'Jakarta',
                    'destination'      => 'Surabaya',
                    'weight'           => 3.5,
                    'koli'             => 2,
                    'length'           => 40.0,
                    'width'            => 30.0,
                    'height'           => 20.0,
                    'payment_method'   => 'cash',
                    'payment_status'   => 'paid',
                    'status'           => 'delivered',
                    'pod_receiver_name' => 'Budi Santoso',
                    'notes'            => 'Fragile — handle with care',
                ],
                'events' => [
                    ['status' => 'pending',          'location' => 'Jakarta',          'description' => 'Shipment registered. Awaiting pickup.',          'days_ago' => 5],
                    ['status' => 'picked_up',        'location' => 'Jakarta',          'description' => 'Package picked up from sender.',                  'days_ago' => 4],
                    ['status' => 'in_transit',       'location' => 'Bandara Soekarno-Hatta', 'description' => 'Cargo loaded on flight GA-201.',           'days_ago' => 4],
                    ['status' => 'arrived_at_hub',   'location' => 'Bandara Juanda, Surabaya', 'description' => 'Arrived at destination airport.',        'days_ago' => 3],
                    ['status' => 'out_for_delivery', 'location' => 'Surabaya',         'description' => 'Out for delivery to recipient.',                  'days_ago' => 3],
                    ['status' => 'delivered',        'location' => 'Surabaya',         'description' => 'Package delivered. Received by Budi Santoso.',    'days_ago' => 2],
                ],
            ],

            // 2 — In Transit (Sea)
            [
                'data' => [
                    'sender_name'      => 'CV Karya Mandiri',
                    'sender_phone'     => '031-7778899',
                    'sender_address'   => 'Jl. Raya Darmo No. 88, Surabaya, Jawa Timur',
                    'receiver_name'    => 'Siti Rahayu',
                    'receiver_phone'   => '08567891234',
                    'receiver_address' => 'Jl. Sam Ratulangi No. 5, Makassar, Sulawesi Selatan',
                    'service_type'     => 'Sea',
                    'origin'           => 'Surabaya',
                    'destination'      => 'Makassar',
                    'weight'           => 120.0,
                    'koli'             => 5,
                    'payment_method'   => 'invoice',
                    'payment_status'   => 'unpaid',
                    'status'           => 'in_transit',
                    'notes'            => 'Mesin industri — jangan ditumpuk',
                ],
                'events' => [
                    ['status' => 'pending',    'location' => 'Surabaya',          'description' => 'Shipment registered. Awaiting pickup.',    'days_ago' => 7],
                    ['status' => 'picked_up',  'location' => 'Surabaya',          'description' => 'Cargo picked up from warehouse.',          'days_ago' => 6],
                    ['status' => 'in_transit', 'location' => 'Pelabuhan Tanjung Perak', 'description' => 'Loaded on vessel KM Nusantara Jaya.', 'days_ago' => 5],
                ],
            ],

            // 3 — Out for Delivery (Land)
            [
                'data' => [
                    'sender_name'      => 'Toko Elektronik Jaya',
                    'sender_phone'     => '022-4445566',
                    'sender_address'   => 'Jl. Asia Afrika No. 100, Bandung, Jawa Barat',
                    'receiver_name'    => 'Ahmad Fauzi',
                    'receiver_phone'   => '08234567890',
                    'receiver_address' => 'Jl. Malioboro No. 77, Yogyakarta, DIY',
                    'service_type'     => 'Land',
                    'origin'           => 'Bandung',
                    'destination'      => 'Yogyakarta',
                    'weight'           => 8.0,
                    'koli'             => 1,
                    'length'           => 60.0,
                    'width'            => 40.0,
                    'height'           => 35.0,
                    'payment_method'   => 'cash',
                    'payment_status'   => 'paid',
                    'status'           => 'out_for_delivery',
                ],
                'events' => [
                    ['status' => 'pending',          'location' => 'Bandung',     'description' => 'Shipment registered.',                          'days_ago' => 3],
                    ['status' => 'picked_up',        'location' => 'Bandung',     'description' => 'Package picked up.',                            'days_ago' => 2],
                    ['status' => 'in_transit',       'location' => 'Purwokerto',  'description' => 'In transit via Purwokerto hub.',                 'days_ago' => 2],
                    ['status' => 'arrived_at_hub',   'location' => 'Yogyakarta',  'description' => 'Arrived at Yogyakarta distribution center.',     'days_ago' => 1],
                    ['status' => 'out_for_delivery', 'location' => 'Yogyakarta',  'description' => 'Courier on the way to recipient address.',       'days_ago' => 0],
                ],
            ],

            // 4 — Pending (Air)
            [
                'data' => [
                    'sender_name'      => 'Ibu Dewi Lestari',
                    'sender_phone'     => '08112233445',
                    'sender_address'   => 'Jl. Gatot Subroto No. 22, Denpasar, Bali',
                    'receiver_name'    => 'Rudi Hermawan',
                    'receiver_phone'   => '08998877665',
                    'receiver_address' => 'Jl. Diponegoro No. 33, Medan, Sumatera Utara',
                    'service_type'     => 'Air',
                    'origin'           => 'Denpasar',
                    'destination'      => 'Medan',
                    'weight'           => 2.0,
                    'koli'             => 1,
                    'payment_method'   => 'cash',
                    'payment_status'   => 'paid',
                    'status'           => 'pending',
                ],
                'events' => [
                    ['status' => 'pending', 'location' => 'Denpasar', 'description' => 'Shipment registered. Awaiting pickup.', 'days_ago' => 0],
                ],
            ],

            // 5 — Arrived at Hub (Sea)
            [
                'data' => [
                    'sender_name'      => 'PT Agro Nusantara',
                    'sender_phone'     => '0411-3334455',
                    'sender_address'   => 'Jl. Penghibur No. 15, Makassar, Sulawesi Selatan',
                    'receiver_name'    => 'Warehouse Pontianak',
                    'receiver_phone'   => '0561-7778899',
                    'receiver_address' => 'Kawasan Industri Pontianak, Kalimantan Barat',
                    'service_type'     => 'Sea',
                    'origin'           => 'Makassar',
                    'destination'      => 'Pontianak',
                    'weight'           => 500.0,
                    'koli'             => 20,
                    'payment_method'   => 'invoice',
                    'payment_status'   => 'unpaid',
                    'status'           => 'arrived_at_hub',
                    'notes'            => 'Produk pertanian — simpan di tempat kering',
                ],
                'events' => [
                    ['status' => 'pending',        'location' => 'Makassar',          'description' => 'Shipment registered.',                          'days_ago' => 10],
                    ['status' => 'picked_up',      'location' => 'Makassar',          'description' => 'Cargo loaded at Makassar port.',                 'days_ago' => 9],
                    ['status' => 'in_transit',     'location' => 'Laut Jawa',         'description' => 'Vessel in transit.',                            'days_ago' => 6],
                    ['status' => 'arrived_at_hub', 'location' => 'Pelabuhan Pontianak', 'description' => 'Arrived at Pontianak port. Awaiting customs.', 'days_ago' => 1],
                ],
            ],

            // 6 — Cancelled (Land)
            [
                'data' => [
                    'sender_name'      => 'Andi Wijaya',
                    'sender_phone'     => '08765432100',
                    'sender_address'   => 'Jl. Pahlawan No. 9, Semarang, Jawa Tengah',
                    'receiver_name'    => 'Rina Kusuma',
                    'receiver_phone'   => '08111222333',
                    'receiver_address' => 'Jl. Veteran No. 44, Solo, Jawa Tengah',
                    'service_type'     => 'Land',
                    'origin'           => 'Semarang',
                    'destination'      => 'Solo',
                    'weight'           => 5.0,
                    'koli'             => 1,
                    'payment_method'   => 'cash',
                    'payment_status'   => 'paid',
                    'status'           => 'cancelled',
                ],
                'events' => [
                    ['status' => 'pending',   'location' => 'Semarang', 'description' => 'Shipment registered.',                                    'days_ago' => 4],
                    ['status' => 'picked_up', 'location' => 'Semarang', 'description' => 'Package picked up.',                                      'days_ago' => 3],
                    ['status' => 'cancelled', 'location' => 'Semarang', 'description' => 'Cancelled by sender — address not found at destination.', 'days_ago' => 2],
                ],
            ],

            // 7 — Delivered (Land)
            [
                'data' => [
                    'sender_name'      => 'Toko Batik Nusantara',
                    'sender_phone'     => '0274-5556677',
                    'sender_address'   => 'Jl. Malioboro No. 200, Yogyakarta, DIY',
                    'receiver_name'    => 'Hendra Gunawan',
                    'receiver_phone'   => '08444555666',
                    'receiver_address' => 'Jl. Raya Kuta No. 55, Badung, Bali',
                    'service_type'     => 'Land',
                    'origin'           => 'Yogyakarta',
                    'destination'      => 'Bali',
                    'weight'           => 6.0,
                    'koli'             => 3,
                    'payment_method'   => 'cash',
                    'payment_status'   => 'paid',
                    'status'           => 'delivered',
                    'pod_receiver_name' => 'Hendra Gunawan',
                ],
                'events' => [
                    ['status' => 'pending',          'location' => 'Yogyakarta',  'description' => 'Shipment registered.',                       'days_ago' => 6],
                    ['status' => 'picked_up',        'location' => 'Yogyakarta',  'description' => 'Package picked up from Toko Batik.',          'days_ago' => 5],
                    ['status' => 'in_transit',       'location' => 'Surabaya',    'description' => 'In transit via Surabaya.',                    'days_ago' => 4],
                    ['status' => 'arrived_at_hub',   'location' => 'Denpasar',    'description' => 'Arrived at Bali distribution center.',        'days_ago' => 3],
                    ['status' => 'out_for_delivery', 'location' => 'Badung',      'description' => 'Out for delivery.',                           'days_ago' => 2],
                    ['status' => 'delivered',        'location' => 'Badung, Bali', 'description' => 'Delivered. Received by Hendra Gunawan.',     'days_ago' => 1],
                ],
            ],

            // 8 — Picked Up (Air)
            [
                'data' => [
                    'sender_name'      => 'PT Teknologi Maju',
                    'sender_phone'     => '021-8889900',
                    'sender_address'   => 'Gedung Cyber 2, Jl. HR Rasuna Said, Jakarta Selatan',
                    'receiver_name'    => 'Universitas Hasanuddin',
                    'receiver_phone'   => '0411-5869000',
                    'receiver_address' => 'Jl. Perintis Kemerdekaan KM 10, Makassar, Sulawesi Selatan',
                    'service_type'     => 'Air',
                    'origin'           => 'Jakarta',
                    'destination'      => 'Makassar',
                    'weight'           => 15.0,
                    'koli'             => 4,
                    'length'           => 50.0,
                    'width'            => 50.0,
                    'height'           => 30.0,
                    'payment_method'   => 'invoice',
                    'payment_status'   => 'unpaid',
                    'status'           => 'picked_up',
                    'notes'            => 'Peralatan lab — sangat sensitif',
                ],
                'events' => [
                    ['status' => 'pending',   'location' => 'Jakarta', 'description' => 'Shipment registered.',          'days_ago' => 2],
                    ['status' => 'picked_up', 'location' => 'Jakarta', 'description' => 'Package picked up by courier.', 'days_ago' => 1],
                ],
            ],
        ];

        foreach ($shipments as $item) {
            $d = $item['data'];

            // Calculate weights & price
            $priceData = $service->calculatePriceFromInputs(
                serviceType: $d['service_type'],
                weight: (float) $d['weight'],
                koli: (int) $d['koli'],
                length: $d['length'] ?? null,
                width: $d['width'] ?? null,
                height: $d['height'] ?? null,
            );

            $trackingNumber = $service->generateUniqueTrackingNumber();

            $shipment = Shipment::create([
                'tracking_number'   => $trackingNumber,
                'sender_name'       => $d['sender_name'],
                'sender_phone'      => $d['sender_phone'],
                'sender_address'    => $d['sender_address'],
                'receiver_name'     => $d['receiver_name'],
                'receiver_phone'    => $d['receiver_phone'],
                'receiver_address'  => $d['receiver_address'],
                'service_type'      => $d['service_type'],
                'origin'            => $d['origin'],
                'destination'       => $d['destination'],
                'weight'            => $d['weight'],
                'koli'              => $d['koli'],
                'length'            => $d['length'] ?? null,
                'width'             => $d['width'] ?? null,
                'height'            => $d['height'] ?? null,
                'volumetric_weight' => $priceData['volumetric_weight'],
                'chargeable_weight' => $priceData['chargeable_weight'],
                'total_price'       => $priceData['total_price'],
                'payment_method'    => $d['payment_method'],
                'payment_status'    => $d['payment_status'],
                'status'            => $d['status'],
                'pod_receiver_name' => $d['pod_receiver_name'] ?? null,
                'notes'             => $d['notes'] ?? null,
            ]);

            // Create events
            foreach ($item['events'] as $i => $ev) {
                $hoursOffset = count($item['events']) - $i;
                $timestamp = now()
                    ->subDays($ev['days_ago'])
                    ->subHours($hoursOffset);

                ShipmentEvent::create([
                    'shipment_id' => $shipment->id,
                    'status'      => $ev['status'],
                    'location'    => $ev['location'],
                    'description' => $ev['description'],
                    'timestamp'   => $timestamp,
                ]);
            }
        }
    }
}
