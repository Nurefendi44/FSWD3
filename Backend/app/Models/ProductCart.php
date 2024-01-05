<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCart extends Model
{
    use HasFactory;
    protected $fillable = [
        'visitors_id',
        'products_id',
        'products_name',
        'products_image',
        'size',
        'variant',
        'quantity',
        'price',
        'total_price'
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id', 'id', 'product_name', 'products_name', 'products_image', 'product_image' ,'variant', 'price');
    }
    public function visitor()
    {
        return $this->belongsTo(Visitor::class, 'id', 'visitors_id');
    }
    public function order()
    {
        return $this->hasMany(Order::class, 'id','productcarts_id', 'size', 'quantity', 'total_price');
    }

}
