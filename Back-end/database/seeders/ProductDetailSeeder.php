<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            DB::table('productdetail')->insert([
        [
            'id_product' => 1,
            'gia' => 3000000,
            'sl' => 10,
            'mota' => 'Nike Air Max 270 chính hãng, phong cách thể thao hiện đại.',
        ],
        [
            'id_product' => 2,
            'gia' => 3300000,
            'sl' => 8,
            'mota' => 'Adidas Ultraboost 22 hỗ trợ chạy bộ tối ưu.',
        ],
        [
            'id_product' => 3,
            'gia' => 2500000,
            'sl' => 12,
            'mota' => 'Puma RS-X3 cá tính, hợp thời trang.',
        ],
    ]);
    }
}
