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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('products_id');
            $table->unsignedBigInteger('visitors_id');
            $table->unsignedBigInteger('productcarts_id');
            $table->string('products_name');
            $table->string('visitors_name');
            $table->string('email');
            $table->string('variant');
            $table->string('size')->nullable();
            $table->string('quantity');
            $table->string('price');
            $table->string('total_price');
            $table->longText('delivery_address');
            $table->string('products_image');
            $table->string('city');
            $table->string('phone_number');
            $table->string('order_date');
            $table->string('order_time');
            $table->string('order_status');
            $table->enum('status', ['Unpaid' , 'Paid']);
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
