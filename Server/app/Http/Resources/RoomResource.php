<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
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
            'type' => 'Rooms',
            'attributes' => [

                'level' => $this->level,
                'number' => $this->number,
                'type' => $this->type,
                'open' => $this->open,
                'rating' => $this->rating,
                'label' => $this->label,
                'description' => $this->description

            ]
            ];
    }
}
