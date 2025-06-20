<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_bill';
    public $timestamps = false;
    protected $fillable = ['id_user', 'hoten_nguoinhan', 'diachi_nguoinhan', 'dienthoai_nguoinhan', 'total', 'pttt', 'ngaydat', 'voucher'];

    public function user() { return $this->belongsTo(User::class, 'id_user'); }
    public function details() { return $this->hasMany(BillDetail::class, 'id_bill'); }
}
