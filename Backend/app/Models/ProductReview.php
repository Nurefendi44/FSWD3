<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;
    protected $fillable = [
        'products_id',
        'visitors_id',
        'orders_id',
        'products_name',
        'reviewer_name',
        'reviewer_image',
        'reviewer_rating',
        'reviewer_comments',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id', 'id', 'product_name', 'products_name');
    }
    public function visitor()
    {
        return $this->belongsTo(Visitor::class, 'visitors_id', 'id');
    }
    public function order()
    {
        return $this->belongsTo(Order::class, 'orders_id', 'id');
    }
}
