<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technical extends Model
{
    use HasFactory;

    protected $table = 'technicals';


      protected $fillable = [
    'name',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */

  public function order()
  {
    return $this->hasMany(Order::class);
  }
  public function feedback()
  {
    return $this->hasMany(Feedback::class);
  }
}
