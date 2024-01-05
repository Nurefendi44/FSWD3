<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class CategoryController extends Controller
{
    public function getCategory()
    {
        $categories = Category::where('status', 1)->get();
        return response()->json([
            "message" => "Succesfully fetched Category.",
            "data" => $categories
        ], Response::HTTP_OK);
    }
    public function showCategoryById(Category $category, $id)
    {
        $category = Category::where('status', 1)->findOrFail($id);
        return response()->json([
            "message" => "Succesfully fetched Category By Id.",
            "data" => $category
        ], Response::HTTP_OK);
    }
    public function index(Request $request)
    {
        $categories = Category::orderBy('id', 'asc')->get();
        // Kembalikan tampilan dengan hasil pencarian
        return view('categories.index', compact('categories'));
    }
    public function create()
    {
        return view('categories.create');
    }
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        $request->validate(
            [
                'category_name' => 'required',
                'category_icon' => 'required',
            ]);

        Category::create($request->post());

        $notification = array(
            'message' => 'Slider Image Inserted Successfully',
            'alert-type' => 'success',
        );

        return redirect()->route('admin.categories.index')->with($notification);
    }
    public function show()
    {
        return view('categories.show',compact('categories'));
    }
    public function edit(Category $category)
    {
        return view('categories.edit',compact('category'));
    }
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'category_name' => 'required',
            'category_icon' => 'required',
        ]);
        $category->fill($request->post())->save();

        return redirect()->route('admin.categories.index')->with('Category Succesfully Updated!');
    }
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('admin.categories.index')->with('Category Succesfully Deleted!');
    }
    public function toggleStatus($id)
    {
        $category = Category::findOrFail($id);
        $category->status = !$category->status; // Mengubah status aktif menjadi nonaktif dan sebaliknya
        $category->save();

        return redirect()->route('admin.categories.index')->with('Category Succesfully Changed!');
    }
}

