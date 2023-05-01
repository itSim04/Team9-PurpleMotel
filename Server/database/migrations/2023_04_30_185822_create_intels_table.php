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
        Schema::create('intels', function (Blueprint $table) {
            $table->id();
            $table->string('room_id');
            $table->string('user_id');
            $table->integer('quiet');
            $table->integer('smoke');
            $table->integer('view');
            $table->integer('wifi');
            $table->integer('tv');
            $table->integer('layout');
            $table->integer('proximity');
            $table->integer('bed');
            $table->integer('bathroom');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('intels');
    }
};
