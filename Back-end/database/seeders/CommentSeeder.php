<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('comment')->insert([
    [
        'id_user' => 1,
        'id_product' => 1,
        'date' => now(),
        'noidung' => 'Giày đẹp, đi êm và rất vừa chân!',
    ],
]);
    }
}
