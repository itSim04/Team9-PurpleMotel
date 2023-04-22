<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PromoCode>
 */
class PromoCodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'change' => random_int(0,1000),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),  
            'code' => fake()->buildingNumber()
        ];
    }
}
