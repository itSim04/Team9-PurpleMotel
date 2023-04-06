<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Permission>
 */
class PermissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        {
            return [
                'concerned_party' => random_int(1, 30),
                'is_singular' => fake()->boolean(),
                'label' => fake()->firstName(),
                'read' => fake()->boolean(),
                'write' => fake()->boolean(),
                'delete' => fake()->boolean()
            ];
        }
    }
}
