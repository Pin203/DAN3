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
        Schema::create('cart', function (Blueprint $table) {
            $table->id('id_cart');
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_productdetail');
            $table->string('name', 255);
            $table->string('img', 255);
            $table->unsignedInteger('quantity');
            $table->decimal('price', 10, 2)->unsigned();
            $table->decimal('dongia', 10, 2)->unsigned();
            $table->decimal('thanhtien', 10, 2)->unsigned();

            // Khóa ngoại
            $table->foreign('id_user')->references('id_user')->on('user');
            $table->foreign('id_productdetail')->references('id_product_detail')->on('productdetail');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart');
    }
};
