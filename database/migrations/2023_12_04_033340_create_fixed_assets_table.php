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
        Schema::create('fixed_assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_name');
            $table->string('asset_class');
            $table->char('units')->default(1);
            $table->string('code')->unique();
            $table->date('acquisition_date');
            $table->integer('acquisition_cost');
            $table->integer('discount');
            $table->integer('net_cost')->default(50000);
            $table->string('dep');
            $table->string('month');
            $table->integer('Opening_Accumulate_at_April-23')->default(0);
            $table->integer('disposal')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fixed_assets');
    }
};
