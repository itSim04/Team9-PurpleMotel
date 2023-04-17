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

            $permissions = ['room', 'user', 'booking', 'language', 'stock', 'room_type', 'user_type'];

            return [
                'concerned_party' => random_int(1, 20),
                'is_singular' => fake()->boolean(),
                'label' => $permissions[random_int(0, 6)],
                'read' => fake()->boolean(),
                'write' => fake()->boolean(),
                'delete' => fake()->boolean()
            ];
        }
    }
}
