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
        Schema::create('office_assets', function (Blueprint $table) {
            $table->id('office_asset_id');
            $table->foreignId('asset_code_id')->constrained('asset_codes','asset_code_id');
            $table->integer('status_id');
            $table->integer('accounting_status_id');
            $table->integer('emp_id');
            $table->string('serial_number')->unique();
            $table->string('brand_name');
            $table->date('purchase_date');
            $table->integer('qty');
            $table->string('floor');
            $table->string('placement_location');
            $table->string('barcode_number');
            $table->integer('price');
            $table->string('asset_image');
            $table->string('image');
            $table->string('remark');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office_assets');
    }
};
