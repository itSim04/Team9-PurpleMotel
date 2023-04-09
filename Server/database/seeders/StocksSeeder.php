<?php

namespace Database\Seeders;

use App\Models\Stocks;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StocksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Stocks::factory(20)->create();
    }
}
