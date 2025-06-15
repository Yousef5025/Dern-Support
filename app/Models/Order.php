<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
      'id',
      'user_id',
      'device_name',
      'description',
      'statues',
    ];

  
    // Post.php (Model)
    public function user()
    {
      return $this->belongsTo(User::class);
    }
}
