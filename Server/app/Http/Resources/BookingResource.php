<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
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
            'type' => 'Booking',
            'attributes' => [
                'check_in' => $this->check_in,
                'end_date' => $this->end_date,
                'exhausted' => $this->exhausted
            ],
            'relationships' => [
                'room' => [
                    'data' => [
                        'id' => (string)$this->room_id
                    ]
                ],
                'user' => [
                    'data' => [
                        'id' => (string)$this->user_id
                    ]
                ]
            ]
        ];
    }
}
