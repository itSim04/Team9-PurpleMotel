<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AppliedPromoCodes>
 */
class AppliedPromoCodesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => random_int(1, 20),
            'promo_id' => random_int(1, 20),
            'exhausted' => fake()->boolean()
        ];
    }
}
