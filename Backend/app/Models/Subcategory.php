<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;
    protected $fillable = ['categories_id' ,'subcategory_name','subcategory_image','status'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id');
    }
    public function product()
    {
        return $this->hasMany(Product::class, 'subcategories_id');

    }

}
