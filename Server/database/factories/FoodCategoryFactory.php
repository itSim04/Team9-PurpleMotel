<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FoodCategory>
 */
class FoodCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => fake()->unique()->randomElement(['Starters', 'Salads', 'Burgers', 'Pizza', 'Pasta', 'Desserts', 'Drinks'])
        ];
    }
}