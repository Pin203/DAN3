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
        Schema::create('bill_detail', function (Blueprint $table) {
            $table->id('id_bill_detail');
            $table->unsignedBigInteger('id_bill');
            $table->unsignedBigInteger('id_productdetail');
            $table->unsignedInteger('sl'); // số lượng
            $table->decimal('gia', 10, 2)->unsigned(); // đơn giá
            $table->string('danhgia', 50)->nullable(); // đánh giá (có thể null)

            // Khóa ngoại
            $table->foreign('id_bill')->references('id_bill')->on('bill');
            $table->foreign('id_productdetail')->references('id_product_detail')->on('productdetail');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bill_detail');
    }
};
