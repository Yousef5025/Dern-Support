<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class FeedbackResource extends JsonResource
{
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'rate' => $this->rate,
      'description' => $this->description,
      'order_id' => $this->order_id,
      'user_id' => $this->user_id,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      'user' => new UserResource($this->whenLoaded('user')),
      'order' => new OrderResource($this->whenLoaded('order')),
    ];
  }
}