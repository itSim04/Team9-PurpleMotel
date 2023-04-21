<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
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
            'stars' => random_int(1, 5),
            'date' => fake()->date(),
            'title' => fake()->sentence(),
            'content' => fake()->sentence()

        ];
    }
}
