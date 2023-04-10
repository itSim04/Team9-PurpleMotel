<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LanguageResource extends JsonResource
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
            'type' => 'Foods',
            'attributes' => [
                'term' => $this->term,
                'value' => $this->value
            ],
            'relationships' => [
                'language' => [
                    'data' => [
                        'id' => str($this->language),
                        'type' => 'Language_List'
                    ]
                ]
            ]
        ];
    }
}
