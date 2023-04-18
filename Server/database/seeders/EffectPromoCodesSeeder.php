<?php

namespace Database\Seeders;

use App\Models\EffectPromoCodes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EffectPromoCodesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EffectPromoCodes::factory(20)->create();
    }
}
