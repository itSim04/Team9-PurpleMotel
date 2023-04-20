<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LikesNewsResource extends JsonResource
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
            'type' => 'likes_news',
            'attributes' => [

                'user_id' => $this->user_id,
                'news_id' => $this->news_id,
                'likes' => $this->likes

            ]

        ];
    }
}
