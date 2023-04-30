<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IntelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'room_id' => $this->room_id,
            'user_id' => $this->user_id,
            'quiet' => $this->quiet,
            'smoke' => $this->smoke,
            'view' => $this->view,
            'wifi' => $this->wifi,
            'tv' => $this->tv,
            'layout' => $this->layout,
            'proximity' => $this->proximity,
            'bed' => $this->bed,
            'bathroom' => $this->bathroom,
        ];
    }
}
