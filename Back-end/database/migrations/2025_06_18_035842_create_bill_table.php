<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bill', function (Blueprint $table) {
            $table->id('id_bill');
            $table->unsignedBigInteger('id_user');
            $table->string('hoten_nguoinhan', 100);
            $table->string('diachi_nguoinhan', 255);
            $table->string('dienthoai_nguoinhan', 20);
            $table->decimal('total', 10, 2)->unsigned();
            $table->string('pttt', 50); // phương thức thanh toán
            $table->timestamp('ngaydat')->useCurrent();
            $table->string('voucher', 50);

            // Khóa ngoại
            $table->foreign('id_user')->references('id_user')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bill');
    }
};
