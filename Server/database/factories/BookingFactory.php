<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_id' => random_int(0,40),
            'user_id' => random_int(0,40),
            'check_in' => fake()->date(),
            'end_date' => fake()->date(),
            'exhausted' => fake()->boolean()    
        ];
    }
    
}
