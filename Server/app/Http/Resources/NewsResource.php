<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
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
            'type' => 'News',
            'attributes' => [
                'title' => $this->title,
                'body' => $this->body,
                'date' => $this->date,
                'likes_number' => $this->likes
            ]
        ];
    }
}
