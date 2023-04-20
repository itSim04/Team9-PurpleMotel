<?php

namespace Database\Seeders;

use App\Models\LikesNews;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikesNewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LikesNews::factory(20)->create();
    }
}
