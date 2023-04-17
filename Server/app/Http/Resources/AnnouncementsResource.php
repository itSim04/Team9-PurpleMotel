<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncementsResource extends JsonResource
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
            'type' => 'Announcements',
            'attributes' => [
                'label' => $this->label,
                'body' => $this->body,
                'concerned_tier' => $this->concerned_tier
            ],
            'relationships' => [
                'user' => [
                    "data" => [
                        'id' => str($this->author_id),
                        "type" => "Users"
                    ]
                ],
            ]
        ];
    }
}
