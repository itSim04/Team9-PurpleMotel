<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InformationResource extends JsonResource
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
            'type' => 'Informations',
            'attributes' => [
                'record' => $this->record,
                'value' => $this->value
            ]

        ];
    }
}
