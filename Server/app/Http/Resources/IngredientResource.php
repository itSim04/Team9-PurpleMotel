<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IngredientResource extends JsonResource
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
            'type' => 'Ingredient',
            'attributes' => [
                'required' => $this->required,
                'quantity' => $this->quantity
            ],
            'relationships' => [
                'food' => [
                    "data" => [
                        'id' => str($this->food_id),
                        "type" => "Food"
                    ]
                ],
                'stock' => [
                    "data" => [
                        'id' => str($this->stock_id),
                        "type" => "Stock"
                    ]
                ]
            ]
        ];
    }
}
