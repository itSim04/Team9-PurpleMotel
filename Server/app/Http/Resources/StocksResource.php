<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StocksResource extends JsonResource
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
            'type' => 'Stocks',
            'attributes' => [
                'label' => $this->label,
                'description' => $this->description,
                'available_quantity' => $this->available_quantity,
                'is_ingredient' => $this->is_ingredient
                
            ]
        ];
    }
}
