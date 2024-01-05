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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('categories_id');
            $table->string('subcategories_id');
            $table->string('product_name');
            $table->string('product_image');
            $table->string('product_image1')->nullable();
            $table->string('product_image2')->nullable();
            $table->string('product_image3')->nullable();
            $table->string('price');
            $table->longText('description');
            $table->string('star')->nullable();
            $table->integer('stock');
            $table->string('variant');
            $table->longText('specification');
            $table->boolean('status')->default(1); // Mengatur nilai default status menjadi 1
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
