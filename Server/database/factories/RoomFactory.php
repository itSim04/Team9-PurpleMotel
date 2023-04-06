<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'level' => random_int(1, 9),
            'number' => random_int(1, 99),
            'type' => random_int(1, 20),
            'open' => fake()->boolean(),
            'rating' => fake()->randomFloat(1, 0, 5),
            'label' => fake()->firstName(),
            'description' => fake()->sentence()
        ];
    }
}
