<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Leads extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'email', 'phone', 'stage', 'assigned_agent',
        'created_at', 'tag', 'deals', 'source', 'last_communication', 'updated_at'
    ];
    public $timestamps = true;

     // Accessor to format created_at
     public function getCreatedAtAttribute($value)
     {
         return Carbon::parse($value)->format('d-m-Y | H:i'); // Example: 28-02-2025 05:42:27
     }
}
