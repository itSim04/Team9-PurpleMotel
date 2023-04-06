<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResource extends JsonResource
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
            'type' => 'Permissions',
            'attributes' => [
                'label' => $this->label,
                'concerned_party' => $this->concerned_party,
                'is_singular' => $this->is_singular,
                'read' => $this->read,
                'write' => $this->write,
                'delete' => $this->delete,
            ]
        ];
    }
}
