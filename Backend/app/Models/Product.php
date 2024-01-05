<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'categories_id',
        'subcategories_id',
        'product_name',
        'product_image',
        'product_image1',
        'product_image2',
        'product_image3',
        'price',
        'description',
        'stock',
        'variant',
        'specification',
        'status',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class, 'categories_id');
    }
    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class, 'subcategories_id');
    }
    public function productcart()
    {
        return $this->hasMany(ProductCart::class, 'products_id', 'id', 'products_name', 'product_name', 'products_image', 'product_image' ,'variant', 'price');

    }
    public function productreview()
    {
        return $this->hasMany(Product::class, 'products_id', 'id', 'product_name', 'products_name');
    }
    public function order()
    {
        return $this->hasMany(Order::class, 'id', 'products_id', 'product_name', 'products_name','products_image', 'product_image'  ,'variant', 'price');
    }
}
