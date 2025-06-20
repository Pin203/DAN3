<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product')->insert([
            [
                'id_category' => 1,
                'id_brand' => 1,
                'name' => 'Nike Air Max 270',
                'price' => 3200000,
                'img' => 'images/nike_air_max_270.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_category' => 2,
                'id_brand' => 2,
                'name' => 'Adidas Ultraboost 22',
                'price' => 3500000,
                'img' => 'images/adidas_ultraboost.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_category' => 3,
                'id_brand' => 3,
                'name' => 'Puma RS-X3',
                'price' => 2700000,
                'img' => 'images/puma_rsx3.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
