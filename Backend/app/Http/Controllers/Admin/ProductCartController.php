<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCart;
use Illuminate\Http\Request;

class ProductCartController extends Controller
{
    public function AddToCart(Request $request, $products_id)
    {
        $visitor = auth()->guard('api-visitor')->user();
        $product = Product::findOrFail($request->products_id);
        $request->validate([
            'variant' => 'required',
            'size' => 'null',
            'quantity' => 'required',
        ]);
        $total_price = $request->quantity * $product->price;

        ProductCart::create([
            'products_id' => $product->id,
            'visitors_id' => $visitor->id,
            'products_name'=>$product->product_name,
            'products_image'=>$product->product_image,
            'size' => $request ->size,
            'variant' => $request->variant,
            'price' => $product->price,
            'quantity' => $request->quantity,
            'total_price'=> $total_price
        ]);
        return response()->json(['message' => 'Product Cart Input Succesfully!']);
    }
    public function getProductCart()
    {
        $visitor = auth()->guard('api-visitor')->user();


        $cartItems = ProductCart::where('visitors_id', $visitor->id)->get();
        return response()->json(['cartItems' => $cartItems]);
    }
    public function getProductCartById($id)
    {
        $visitor = auth()->guard('api-visitor')->user();

        $cartItem = ProductCart::where('visitors_id', $visitor->id)
        ->where('id', $id)
        ->first();
        if (!$cartItem) {
            return response()->json(['message' => 'Item not found'], 404);
        }
        return response()->json(['cartItem' => $cartItem]);
    }
    public function RemoveCartList($id)
    {
        $visitor = auth()->guard('api-visitor')->user();


        $cartItem = ProductCart::where('visitors_id', $visitor->id)
        ->where('id', $id)
        ->first();
        if (!$cartItem) {
            return response()->json(['message' => 'Product Cart not found'], 404);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Product Removed From Cart!']);
    }
    public function CartItemPlus(Request $request, $id)
{
    $visitor = auth()->guard('api-visitor')->user();


    $cartItem = ProductCart::where('visitors_id', $visitor->id)
        ->where('id', $id)
        ->first();

    if (!$cartItem) {
        return response()->json(['message' => 'Product Cart Not Found'], 404);
    }


    $quantity = $cartItem->quantity;
    $price = $cartItem->price;


    $newQuantity = $quantity + 1;
    $totalPrice = $newQuantity * $price;


    $cartItem->update([
        'quantity' => $newQuantity,
        'total_price' => $totalPrice
    ]);

    return response()->json(['message' => 'Product Quantity Increased!']);
    }
    public function CartItemMinus(Request $request, $id)
    {
        $visitor = auth()->guard('api-visitor')->user();


        $cartItem = ProductCart::where('visitors_id', $visitor->id)
            ->where('id', $id)
            ->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Product Cart Not Found'], 404);
        }


        $quantity = $cartItem->quantity;
        $price = $cartItem->price;


        $newQuantity = $quantity - 1;
        $totalPrice = $newQuantity * $price;

       
        $cartItem->update([
            'quantity' => $newQuantity,
            'total_price' => $totalPrice
        ]);

        return response()->json(['message' => 'Product Quantity Reduced!']);
    }

}
