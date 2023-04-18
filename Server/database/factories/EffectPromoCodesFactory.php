<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EffectPromoCodes>
 */
class EffectPromoCodesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'promo_id' => random_int(1, 20),
            'effect_id' => random_int(1, 20),
            'type' => random_int(0, 2)
        ];
    }
}
