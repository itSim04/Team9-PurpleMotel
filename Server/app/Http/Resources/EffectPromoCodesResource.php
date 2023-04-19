<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EffectPromoCodesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string)$this->id,
            'type' => 'EffectPromoCodes',
            'attributes' => [
                'promo_id' => (string)$this->promo_id,
                'effect_id' => (string)$this->effect_id,
                'type' => $this->type,
            ]

        ];
    }
}
