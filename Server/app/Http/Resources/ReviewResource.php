<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'type' => 'Review',
            'attributes' => [
                'room_id' => (string)$this->room_id,
                'user_id' => (string)$this->user_id,
                'stars' => (string)$this->stars,
                'date' => (string)$this->date,
                'title' => (string)$this->title,
                'content' => (string)$this->content
            ]

        ];
    }
}
