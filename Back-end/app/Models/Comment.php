<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_comment';
    public $timestamps = false;
    protected $fillable = ['id_user', 'id_product', 'date', 'noidung'];

    public function user() { return $this->belongsTo(User::class, 'id_user'); }
    public function product() { return $this->belongsTo(Product::class, 'id_product'); }
}
