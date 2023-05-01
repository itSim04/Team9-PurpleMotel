<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppliedPromoCodesResource extends JsonResource
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
            'type' => 'AppliedPromoCodes',
            'attributes' => [
                'user_id' => (string)$this->user_id,
                'promo_id' => (string)$this->promo_id,
                'exhausted' => $this->exhausted
            ]

        ];
    }
}
