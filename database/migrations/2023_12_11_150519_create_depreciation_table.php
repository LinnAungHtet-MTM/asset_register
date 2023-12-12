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
        Schema::create('depreciation', function (Blueprint $table) {
           
            $table->id('depreciation_id');
            $table->foreignId('office_asset_id')->constrained('office_assets','office_asset_id'); 
            $table->integer('deduct');
            $table->integer('net_cost');
            $table->integer('depreciation_percent');
            $table->integer('financial_month');
            $table->date('opening_date');
            $table->integer('opening_amount');
            $table->integer('disposal');
            $table->string('remark');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('depreciation');
    }
};
