<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;
    protected $table = 'productdetail';
    protected $primaryKey = 'id_product_detail';
    public $timestamps = false;
    protected $fillable = ['id_product', 'gia', 'sl', 'mota','id_size', 'id_color'];

    public function product() { 
        return $this->belongsTo(Product::class, 'id_product'); 
    }

    public function color()
    {
        return $this->belongsTo(Color::class, 'id_color');
    }

    // Quan hệ tới bảng size
    public function size()
    {
        return $this->belongsTo(Size::class, 'id_size');
    }
}
