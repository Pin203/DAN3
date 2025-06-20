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
        Schema::create('productdetail', function (Blueprint $table) {
            $table->id('id_product_detail');
            $table->unsignedBigInteger('id_product');
            $table->decimal('gia', 10, 2)->unsigned();
            $table->unsignedInteger('sl')->nullable(); // số lượng
            $table->text('mota')->nullable(); // mô tả
            $table->unsignedBigInteger('id_color')->nullable()->after('mota');
            $table->unsignedBigInteger('id_size')->nullable()->after('id_color');

            // Khóa ngoại
            $table->foreign('id_color')->references('id_color')->on('color')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('id_size')->references('id_size')->on('size')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('id_product')->references('id_product')->on('product');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productdetail');
    }
};
