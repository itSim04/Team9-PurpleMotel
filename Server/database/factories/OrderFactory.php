<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'food_id' => random_int(0,40),
            'user_id' => random_int(0,40),
            'date' => fake()->date(),
            'status' => random_int(1, 4),
            'order_id' => random_int(1, 20)
        ];
    }
}







































