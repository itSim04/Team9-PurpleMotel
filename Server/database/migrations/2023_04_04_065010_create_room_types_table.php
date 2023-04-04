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
        Schema::create('room_types', function (Blueprint $table) {
            $table->id();
            $table->string('label', 32);
            $table->float('price');
            $table->string('description')->nullable();
            $table->unsignedSmallInteger('adults_capacity');
            $table->unsignedSmallInteger('adults_with_kids_capacity');
            $table->unsignedSmallInteger('kids_capacity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_types');
    }
};
