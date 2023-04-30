<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Intel>
 */
class IntelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_id' => random_int(1, 20),
            'user_id' => random_int(1, 20),
            'quiet' => $this->faker->numberBetween(1, 100),
            'smoke' => $this->faker->numberBetween(1, 100),
            'view' => $this->faker->numberBetween(1, 100),
            'wifi' => $this->faker->numberBetween(1, 100),
            'tv' => $this->faker->numberBetween(1, 100),
            'layout' => $this->faker->numberBetween(1, 100),
            'proximity' => $this->faker->numberBetween(1, 100),
            'bed' => $this->faker->numberBetween(1, 100),
            'bathroom' => $this->faker->numberBetween(1, 100),
        ];
    }
}
