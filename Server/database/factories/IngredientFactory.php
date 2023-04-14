<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ingredient>
 */
class IngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'food_id' => random_int(0, 20),
            'stock_id' => random_int(0, 20),
            'required' => fake()->boolean(),
            'quantity' => random_int(1, 5)

        ];
    }
}
