<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Food>
 */
class FoodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => fake()->firstName(),
            'description'  => fake()->sentence(),
            'price' => fake()->randomFloat(2, 0, 5000),
            'is_served' => fake()->boolean(),
        ];
    }
}
