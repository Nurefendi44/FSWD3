<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SubcategoryController extends Controller
{
    public function getSubcategory()
    {
        $subcategories = Subcategory::where('status', 1)->get();

        return response()->json([
            "message" => "Succesfully fetched Subcategory.",
            "data" => $subcategories
        ], Response::HTTP_OK);
    }
    public function showSubcategoryById(Subcategory $subcategories, $id)
    {
        $subcategories = Subcategory::where('status', 1)->findOrFail($id);
        return response()->json([
            "message" => "Succesfully fetched Subcategory By Id.",
            "data" => $subcategories
        ], Response::HTTP_OK);
    }
    public function getSubcategoryByCategory($categoryId)
    {
    $category = Category::find($categoryId);

    if (!$category) {
        return response()->json([
            "message" => "Category not found.",
        ], Response::HTTP_NOT_FOUND);
    }
    $subcategory = $category->subcategory;

    return response()->json([
        "message" => "Successfully fetched Subcategory for Category {$category->category_name}.",
        "data" => $subcategory
    ], Response::HTTP_OK);
    }
    public function index(Request $request)
    {
        $categories = Category::all();

        $subcategories = SubCategory::orderBy('id', 'asc')->get();

        return view('subcategories.index', compact('subcategories','categories'));
    }
    public function create()
    {
        $categories = Category::all();
        return view('subcategories.create', compact ('categories'));
    }
    private $imagePath = 'img/subcategory';
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
                'categories_id' => 'required',
                'subcategory_name' => 'required',
                'subcategory_image' => 'required',
            ],
            [
                'subcategory_image.required' => 'SubCategory Image is required!',
        ]);


        $image = $request->file('subcategory_image');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('img/subcategory_images'), $name_gen);
        $save_url = url('img/subcategory_images/' . $name_gen);

        Subcategory::create([
            'categories_id' => $request->categories_id,
            'subcategory_name' => $request->subcategory_name,
            'subcategory_image' => $save_url,
        ]);

        $notification = array(
            'message' => 'Subcategory Image Inserted Successfully',
            'alert-type' => 'success',
        );

        return redirect()->route('admin.subcategories.index')->with($notification);
    }

    public function show(Subcategory $subcategory)
    {
        return view('subcategories.show',compact('subcategory'));
    }


    public function edit(Subcategory $subcategory)
    {
        $categories = Category::all();
        return view('subcategories.edit',compact('subcategory','categories'));
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'categories_id' => 'required',
            'subcategory_name' => 'required',
            'subcategory_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $subcategory = Subcategory::find($id);

        if (!$subcategory) {
            return redirect()->route('admin.subcategories.index')->with('error', 'Subcategory not found.');
        }


        $old_image_url = $subcategory->subcategory_image;


        if ($request->hasFile('subcategory_image')) {
            $image = $request->file('subcategory_image');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('img/subcategory_images'), $name_gen);
            $new_image_url = url('img/subcategory_images/' . $name_gen);


            if ($old_image_url) {
                $old_image_path = public_path(str_replace(url('/'), '', $old_image_url));
                if (file_exists($old_image_path)) {
                    unlink($old_image_path);
                }
            }


            $subcategory->update([
                'categories_id' => $request->categories_id,
                'subcategory_name' => $request->subcategory_name,
                'subcategory_image' => $new_image_url,
            ]);
        } else {

            $subcategory->update([
                'categories_id' => $request->categories_id,
                'subcategory_name' => $request->subcategory_name,
            ]);
        }

        $notification = [
            'message' => 'Subcategory Updated Successfully',
            'alert-type' => 'success',
        ];

        return redirect()->route('admin.subcategories.index')->with($notification);
    }

    public function destroy(Subcategory $subcategory)
    {

         $filename = public_path(str_replace(url('/'), '', $subcategory->subcategory_image));

         if (file_exists($filename)) {
             unlink($filename);
         }

        $subcategory->delete();
        return redirect()->route('admin.subcategories.index')->with('Subcategory Succesfully Deleted!');
    }
    public function toggleStatus($id)
    {
        $subcategory = Subcategory::findOrFail($id);
        $subcategory->status = !$subcategory->status; 
        $subcategory->save();

        return redirect()->route('admin.subcategories.index')->with('Status Subcategory Succesfully Updated!');
    }
}
