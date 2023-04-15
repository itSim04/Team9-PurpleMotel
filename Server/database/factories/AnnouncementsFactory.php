<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Annoucements>
 */
class AnnouncementsFactory extends Factory
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
            'body' => fake()->sentence(),
            'concerned_tier' => random_int(0, 2),
            'author_id' => random_int(1, 40)
            
        ];
    }
}
