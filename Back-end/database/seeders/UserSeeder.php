<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user')->insert([
            [
                'username' => 'admin',
                'password' => Hash::make('admin123'), // mật khẩu mã hóa
                'name' => 'Quản trị viên',
                'diachi' => 'Hà Nội',
                'dienthoai' => '0901234567',
                'email' => 'admin@giaydep.vn',
                'role' => 'admin',
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'user1',
                'password' => Hash::make('user123'),
                'name' => 'Nguyễn Văn A',
                'diachi' => 'TP.HCM',
                'dienthoai' => '0911222333',
                'email' => 'user1@example.com',
                'role' => 'user',
                'email_verified_at' => null,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
