<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderContainsResource extends JsonResource
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
            'type' => 'OrderContains',
            'attributes' => [
                'quantity' => $this->quantity,
            ],
            'relationships' => [
                'food' => [
                    'data' => [
                        'id' => (string)$this->food_id,
                        "type" => "user"
                    ]
                ],
                'order' => [
                    'data' => [
                        'id' => (string)$this->order_id,
                        "type" => "user"
                    ]
                ]
            ]
        ];
    }
}
