<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $fillable = [
      'id',
      'user_id', 
      'order_id',
      'description',
      'rate',
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }
    public function order()
    {
      return $this->belongsTo(Order::class);
    }
}
