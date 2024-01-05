<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'products_id',
        'visitors_id',
        'productcarts_id',
        'products_name',
        'visitors_name',
        'email',
        'variant',
        'size',
        'quantity',
        'price',
        'total_price',
        'delivery_address',
        'products_image',
        'city',
        'phone_number',
        'order_date',
        'order_time',
        'order_status',
        'status'
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'id', 'products_id', 'product_name', 'products_name','products_image', 'product_image' ,'variant', 'price');
    }
    public function productcart()
    {
        return $this->belongsTo(ProductCart::class, 'id','productcarts_id', 'size', 'quantity', 'total_price');
    }
    public function visitor()
    {
        return $this->belongsTo(Visitor::class, 'id', 'visitors_id', 'name', 'visitors_name', 'email');
    }
    public function productreview()
    {
        return $this->hasMany(ProductReview::class, 'orders_id');
    }
}
