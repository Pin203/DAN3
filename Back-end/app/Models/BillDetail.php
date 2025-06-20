<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillDetail extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_bill_detail';
    public $timestamps = false;
    protected $fillable = ['id_bill', 'id_productdetail', 'sl', 'gia', 'danhgia'];

    public function bill() { return $this->belongsTo(Bill::class, 'id_bill'); }
    public function productDetail() { return $this->belongsTo(ProductDetail::class, 'id_productdetail'); }
}
