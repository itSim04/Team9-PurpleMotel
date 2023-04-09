<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->firstName(),
            'description' => fake()->sentence(),
            'capacity' => random_int(0,64),
            'price' => random_int(0,255),
            'start_date' => fake()->date(),
            'end_date' => fake()->date()
        ];
    }
}
