<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
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
            'type' => 'Registration',
            'attributes' => [
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'seats' => $this->seats
            ],
            'relationships' => [
                'activity' => [
                    'data' => [
                        'id' => (string)$this->activity_id,
                        "type" => "activity"
                    ]
                ],
                'user' => [
                    'data' => [
                        'id' => (string)$this->user_id,
                        "type" => "user"
                    ]
                ]
            ]
        ];
    }
}
