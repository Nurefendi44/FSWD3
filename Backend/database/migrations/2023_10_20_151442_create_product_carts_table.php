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
        Schema::create('product_carts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('visitors_id');
            $table->unsignedBigInteger('products_id');
            $table->string('products_name');
            $table->string('products_image');
            $table->string('size')->nullable();
            $table->string('variant')->nullable();
            $table->string('quantity')->nullable();
            $table->string('price');
            $table->string('total_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
