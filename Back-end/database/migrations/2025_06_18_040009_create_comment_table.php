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
        Schema::create('comment', function (Blueprint $table) {
            $table->id('id_comment');
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_product');
            $table->dateTime('date')->useCurrent();
            $table->text('noidung')->nullable();

            // Khóa ngoại
            $table->foreign('id_user')->references('id_user')->on('user');
            $table->foreign('id_product')->references('id_product')->on('product');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment');
    }
};
