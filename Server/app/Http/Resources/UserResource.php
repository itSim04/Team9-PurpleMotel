<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'type' => 'Users',
            'attributes' => [
                'first_name' => $this->first_name,
                'last_name' => $this->last_name,
                'email' => $this->email,
                'gender' =>(string) $this->gender,
                'phone' => $this->phone,
                'language' => $this->language,
                'date_of_birth' => $this->date_of_birth,
                'tier' => $this->tier,
                'type' => $this->tier,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at
                
            ]
        ];
    }
}
