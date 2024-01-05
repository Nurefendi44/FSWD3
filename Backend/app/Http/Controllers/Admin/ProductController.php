<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function getProduct()
    {
        $products = Product::where('status', 1)->get();

        return response()->json([
            "message" => "Succesfully fetched Product.",
            "data" => $products
        ], Response::HTTP_OK);
    }
    public function showProductById(Product $products, $id)
    {
        $products = Product::where('status', 1)->findOrFail($id);
        return response()->json([
            "message" => "Succesfully fetched Product By Id.",
            "data" => $products
        ], Response::HTTP_OK);
    }
    public function getProductByCategory($categoryId)
    {
    $category = Category::find($categoryId);

    if (!$category) {
        return response()->json([
            "message" => "Category not found.",
        ], Response::HTTP_NOT_FOUND);
    }
    $product = $category->product;

    return response()->json([
        "message" => "Successfully fetched Product for Category {$category->category_name}.",
        "data" => $product
    ], Response::HTTP_OK);
    }
    public function getSubcategoryByCategory($subcategoryId)
    {
    $subcategory = Subcategory::find($subcategoryId);

    if (!$subcategory) {
        return response()->json([
            "message" => "Subcategory not found.",
        ], Response::HTTP_NOT_FOUND);
    }
    $product = $subcategory->product;

    return response()->json([
        "message" => "Successfully fetched Product for SubCategory {$subcategory->subcategory_name}.",
        "data" => $product
    ], Response::HTTP_OK);
    }
    public function index(Request $request)
    {
        $categories = Category::all();
        $subcategories = Subcategory::all();

        $products = Product::orderBy('id', 'asc')->paginate(5);

        return view('products.index', compact('products','subcategories','categories'));
    }
    public function create()
    {
        $categories = Category::all();
        $subcategories = Subcategory::all();
        return view('products.create', compact ('categories','subcategories'));
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *//**
     * Display the specified resource.
     */
    public function store(Request $request)
    {
    $request->validate([
        'categories_id' => 'required',
        'subcategories_id' => 'required',
        'product_name' => 'required',
        'product_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'price' => 'required',
        'description' => 'required',
        'stock' => 'required|integer',
        'variant' => 'required',
        'specification' => 'required',
    ]);

    $image = $request->file('product_image');
    $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
    $image->move(public_path('img/product_images'), $name_gen);
    $save_url = url('img/product_images/' . $name_gen);

    $productData = [
        'categories_id' => $request->categories_id,
        'subcategories_id' => $request->subcategories_id,
        'product_name' => $request->product_name,
        'product_image' => $save_url,
        'price' => $request->price,
        'description' => $request->description,
        'specification' => $request->specification,
        'stock' => $request->stock,
        'variant' => $request->variant,
    ];


    if ($request->hasFile('product_image1')) {
        $image = $request->file('product_image1');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('img/product_images'), $name_gen);
        $save_url = url('img/product_images/' . $name_gen);
        $productData['product_image1'] = $save_url;
    }


    if ($request->hasFile('product_image2')) {
        $image = $request->file('product_image2');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('img/product_images'), $name_gen);
        $save_url = url('img/product_images/' . $name_gen);
        $productData['product_image2'] = $save_url;
    }


    if ($request->hasFile('product_image3')) {
        $image = $request->file('product_image3');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('img/product_images'), $name_gen);
        $save_url = url('img/product_images/' . $name_gen);
        $productData['product_image3'] = $save_url;
    }

    Product::create($productData);

    $notification = [
        'message' => 'Product Inserted Successfully',
        'alert-type' => 'success',
    ];

    return redirect()->route('admin.products.index')->with($notification);
    }

    public function show(Product $product)
    {
        return view('products.show',compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $subcategories = Subcategory::all();
        return view('products.edit',compact('product','subcategories','categories'));
    }
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'categories_id' => 'required',
            'subcategories_id' => 'required',
            'product_name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'stock' => 'required|integer',
            'variant' => 'required',
            'specification' => 'required',
        ]);

        $productData = [
            'categories_id' => $request->categories_id,
            'subcategories_id' => $request->subcategories_id,
            'product_name' => $request->product_name,
            'price' => $request->price,
            'description' => $request->description,
            'specification' => $request->specification,
            'stock' => $request->stock,
            'variant' => $request->variant,
        ];


        if ($request->hasFile('product_image')) {
            $request->validate([
                'product_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);


            if ($product->product_image && file_exists(public_path('img/product_images/' . basename($product->product_image)))) {
                unlink(public_path('img/product_images/' . basename($product->product_image)));
            }

            $image = $request->file('product_image');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/product_images'), $name_gen);
            $save_url = url('img/product_images/' . $name_gen);

            $productData['product_image'] = $save_url;
            }


            if ($request->hasFile('product_image1')) {
            $request->validate([
                'product_image1' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);


            if ($product->product_image1 && file_exists(public_path('img/product_images/' . basename($product->product_image1)))) {
                unlink(public_path('img/product_images/' . basename($product->product_image1)));
            }

            $image = $request->file('product_image1');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/product_images'), $name_gen);
            $save_url = url('img/product_images/' . $name_gen);

            $productData['product_image1'] = $save_url;
        }

         if ($request->hasFile('product_image2')) {
            $request->validate([
                'product_image2' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);


            if ($product->product_image2 && file_exists(public_path('img/product_images/' . basename($product->product_image2)))) {
                unlink(public_path('img/product_images/' . basename($product->product_image2)));
            }

            $image = $request->file('product_image2');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/product_images'), $name_gen);
            $save_url = url('img/product_images/' . $name_gen);

            $productData['product_image2'] = $save_url;
        }

         if ($request->hasFile('product_image3')) {
            $request->validate([
                'product_image3' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);


            if ($product->product_image3 && file_exists(public_path('img/product_images/' . basename($product->product_image3)))) {
                unlink(public_path('img/product_images/' . basename($product->product_image3)));
            }

            $image = $request->file('product_image3');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/product_images'), $name_gen);
            $save_url = url('img/product_images/' . $name_gen);

            $productData['product_image3'] = $save_url;
        }


        $product->update($productData);

        $notification = [
            'message' => 'Product Updated Successfully',
            'alert-type' => 'success',
        ];

        return redirect()->route('admin.products.index')->with($notification);
    }


    public function destroy(Product $product)
{

    $imagePaths = [
        $product->product_image,
        $product->product_image1,
        $product->product_image2,
        $product->product_image3
    ];


    foreach ($imagePaths as $imagePath) {
        if ($imagePath) {
            $filename = public_path(str_replace(url('/'), '', $imagePath));
            if (file_exists($filename)) {
                unlink($filename);
            }
        }
    }


    $product->delete();

    return redirect()->route('admin.products.index')->with('success', 'Product Successfully Deleted!');
}
    public function toggleStatus($id)
    {
        $product = Product::findOrFail($id);
        $product->status = !$product->status; 
        $product->save();

        return redirect()->route('admin.products.index')->with('Status Product Succesfully Updated!');
    }

}
