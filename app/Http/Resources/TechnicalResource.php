<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TechnicalResource extends JsonResource
{
    public static $wrap = false;

    
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}