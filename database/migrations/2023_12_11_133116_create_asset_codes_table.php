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
        Schema::create('asset_codes', function (Blueprint $table) {
            $table->id('asset_code_id');
            $table->foreignId('asset_class_id')->constrained('asset_classes', 'asset_class_id'); 
            $table->string('asset_code');
            $table->string('asset_name');
            $table->tinyInteger('is_active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_codes');
    }
};
