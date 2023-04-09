<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
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
            'type' => 'Activity',
            'attributes' => [
                'title' => $this->title,
                'description' => $this->description,
                'capacity' => $this->capacity,
                'price' => $this->price,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date
            ]
        ];
    }
}
