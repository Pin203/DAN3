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
        Schema::create('product', function (Blueprint $table) {
    $table->id('id_product');
    $table->unsignedBigInteger('id_category');
    $table->unsignedBigInteger('id_brand');
    $table->string('name', 255);
    $table->decimal('price', 10, 2)->unsigned();
    $table->string('img', 255);
    $table->timestamps(); // created_at, updated_at
    $table->integer('discount')->default(0);
    $table->boolean('is_featured')->default(false);

    // Khóa ngoại
    $table->foreign('id_category')->references('id_category')->on('category');
    $table->foreign('id_brand')->references('id_brand')->on('brand');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
