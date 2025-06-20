<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cart')->insert([
    [
        'id_user' => 1,
        'id_productdetail' => 1,
        'name' => 'Nike Air Max 270',
        'img' => 'images/nike_air_max_270.jpg',
        'quantity' => 1,
        'price' => 3200000,
        'dongia' => 3200000,
        'thanhtien' => 3200000,
    ],
]);
    }
}
