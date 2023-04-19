<?php

namespace Database\Seeders;

use App\Models\AppliedPromoCodes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppliedPromoCodesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AppliedPromoCodes::factory(20)->create();
    }
}
