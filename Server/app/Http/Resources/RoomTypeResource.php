<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
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
            'type' => 'RoomTypes',
            'attributes' => [

                'label' => $this->label,
                'price' => $this->price,
                'description' => $this->description,
                'adults_capacity' => $this->adults_capacity,
                'adults_with_kids_capacity' => $this->adults_with_kids_capacity,
                'kids_capacity' => $this->kids_capacity,

            ]
        ];
    }
}
