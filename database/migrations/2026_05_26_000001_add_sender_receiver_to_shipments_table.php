<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('shipments', function (Blueprint $table) {
            // Sender info
            $table->string('sender_name')->after('tracking_number');
            $table->string('sender_phone')->after('sender_name');
            $table->text('sender_address')->after('sender_phone');

            // Receiver info
            $table->string('receiver_name')->after('sender_address');
            $table->string('receiver_phone')->after('receiver_name');
            $table->text('receiver_address')->after('receiver_phone');

            // Volumetric weight
            $table->decimal('length', 8, 2)->nullable()->after('koli');
            $table->decimal('width', 8, 2)->nullable()->after('length');
            $table->decimal('height', 8, 2)->nullable()->after('width');
            $table->decimal('volumetric_weight', 10, 2)->nullable()->after('height');
            $table->decimal('chargeable_weight', 10, 2)->nullable()->after('volumetric_weight');

            // Payment
            $table->enum('payment_method', ['cash', 'invoice'])->default('cash')->after('total_price');
            $table->enum('payment_status', ['paid', 'unpaid'])->default('paid')->after('payment_method');
            $table->text('billing_notes')->nullable()->after('payment_status');

            // POD
            $table->string('pod_photo')->nullable()->after('billing_notes');
            $table->string('pod_receiver_name')->nullable()->after('pod_photo');

            // Notes
            $table->text('notes')->nullable()->after('pod_receiver_name');
        });
    }

    public function down(): void
    {
        Schema::table('shipments', function (Blueprint $table) {
            $table->dropColumn([
                'sender_name', 'sender_phone', 'sender_address',
                'receiver_name', 'receiver_phone', 'receiver_address',
                'length', 'width', 'height', 'volumetric_weight', 'chargeable_weight',
                'payment_method', 'payment_status', 'billing_notes',
                'pod_photo', 'pod_receiver_name', 'notes',
            ]);
        });
    }
};
