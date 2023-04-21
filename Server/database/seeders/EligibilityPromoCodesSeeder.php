<?php

namespace Database\Seeders;

use App\Models\EligibilityPromoCodes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EligibilityPromoCodesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EligibilityPromoCodes::factory(20)->create();
    }
}
