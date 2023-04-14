<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodResource extends JsonResource
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
            'type' => 'Foods',
            'attributes' => [
                'label' => $this->label,
                'description' => $this->description,
                'price' => $this-> price,
                'is_served' => $this->  is_served
            ],
            'relationships' => [
                'food_category' => [
                    "data" => [
                        'id' => str($this->category),
                        "type" => "Food_Category"
                    ]
                ]
            ]
        ];
    }
}
