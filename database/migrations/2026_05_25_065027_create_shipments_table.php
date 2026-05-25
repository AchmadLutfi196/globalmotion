<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tracking_number')->unique();
            $table->string('service_type');
            $table->string('origin');
            $table->string('destination');
            $table->decimal('weight', 10, 2);
            $table->integer('koli');
            $table->decimal('total_price', 15, 2);
            $table->string('status');
            $table->timestamp('estimated_delivery')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
