<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
        BrandSeeder::class,
        CategorySeeder::class,
        ProductSeeder::class,
        ProductDetailSeeder::class,
        UserSeeder::class,
        CartSeeder::class,
        CommentSeeder::class,
        SizeSeeder::class,
        ColorSeeder::class,
    ]);
    }
}
