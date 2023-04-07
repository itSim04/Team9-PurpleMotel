<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomType>
 */
class RoomTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $adults_capacity = random_int(2, 40);
        $adults_with_kids = floor($adults_capacity / 6);
        $kids_capacity = $adults_capacity - $adults_with_kids;

        return [
            'label' => fake()->firstName(),
            'price' => fake()->randomFloat(2, 0, 5000),
            'description'  => fake()->sentence(),
            'adults_capacity' => $adults_capacity,
            'adults_with_kids_capacity' => $adults_with_kids,
            'kids_capacity' => $kids_capacity,
        ];
    }
}
