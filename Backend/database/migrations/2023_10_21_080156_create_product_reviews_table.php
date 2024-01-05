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
        Schema::create('product_reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('products_id');
            $table->unsignedBigInteger('visitors_id');
            $table->unsignedBigInteger('orders_id');
            $table->string('reviewer_name');
            $table->string('reviewer_image')->nullable();
            $table->unsignedTinyInteger('reviewer_rating');
            $table->text('reviewer_comments');
            $table->boolean('status')->default(1); // Mengatur nilai default status menjadi 1
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_reviews');
    }
};
