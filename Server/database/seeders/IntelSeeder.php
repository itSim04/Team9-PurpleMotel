<?php

namespace Database\Seeders;

use App\Models\Intel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IntelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Intel::factory()->count(1000)->create();
    }
}
