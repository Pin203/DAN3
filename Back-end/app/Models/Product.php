<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';
    protected $primaryKey = 'id_product';
    public $timestamps = true;
    protected $fillable = ['id_category', 'id_brand', 'name', 'price', 'img'];

    public function brand() { return $this->belongsTo(Brand::class, 'id_brand'); }
    public function category() { return $this->belongsTo(Category::class, 'id_category'); }
    public function comments() { return $this->hasMany(Comment::class, 'id_product'); }
    public function productDetails() { return $this->hasMany(ProductDetail::class, 'id_product'); }
}
