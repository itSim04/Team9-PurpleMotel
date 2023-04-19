<?php

namespace Database\Seeders;

use App\Models\OrderContains;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderContainsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OrderContains::factory(20)->create();
    }
}
