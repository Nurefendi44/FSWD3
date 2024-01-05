<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\HomeSlider;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class HomeSliderController extends Controller
{
    public function getHomeslider()
    {
        $homesliders = HomeSlider::where('status', 1)->get();
        return response()->json([
            "message" => "Succesfully fetched Home Slider.",
            "data" => $homesliders
        ], Response::HTTP_OK);
    }
    public function showHomesliderById(HomeSlider $homeslider, $id)
    {
        $homeslider = HomeSlider::where('status', 1)->findOrFail($id);
        return response()->json([
            "message" => "Succesfully fetched Home Slider By Id.",
            "data" => $homeslider
        ], Response::HTTP_OK);
    }
    public function index()
    {
        $homesliders = HomeSlider::orderBy('id','asc')->get();
        return view('homesliders.index', compact('homesliders'));
    }
    public function create()
    {
        return view ('homesliders.create');
    }
       /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    private $imagePath = 'img/home_slider';

    public function store(Request $request)
    {
        $request->validate(
            [
                'slider_image' => 'required',
            ],
            [
                'slider_image.required' => 'Slider Image is required!',
        ]);
        // Working with Image
        $image = $request->file('slider_image');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('img/home_slider'), $name_gen);
        $save_url = url('img/home_slider/' . $name_gen);

        HomeSlider::create([
            'slider_image' => $save_url,
        ]);

        $notification = array(
            'message' => 'Slider Image Inserted Successfully',
            'alert-type' => 'success',
        );

        return redirect()->route('admin.homesliders.index')->with($notification);
    }
    public function show()
    {
        return view('homesliders.show',compact('homeslider'));
    }
    public function edit(HomeSlider $homeslider)
    {
        return view('homesliders.edit',compact('homeslider'));
    }
    public function update(Request $request, $id)
    {
    $request->validate([
        'slider_image' => 'sometimes|image|mimes:jpeg,png,jpg',
    ]);

    $slider = HomeSlider::find($id);

    if (!$slider) {
        return redirect()->route('admin.homesliders.index')->with('error', 'Slider not found.');
    }

    // Simpan URL gambar lama untuk penghapusan
    $old_image_url = $slider->slider_image;

    // Jika ada gambar baru yang diunggah
    if ($request->hasFile('slider_image')) {
        $image = $request->file('slider_image');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('img/home_slider'), $name_gen);
        $new_image_url = url('img/home_slider/' . $name_gen);

        // Hapus gambar lama jika ada
        if ($old_image_url) {
            $old_image_path = public_path(str_replace(url('/'), '', $old_image_url));
            if (file_exists($old_image_path)) {
                unlink($old_image_path);
            }
        }

        // Simpan URL gambar baru
        $slider->update([
            'slider_image' => $new_image_url,
        ]);
    }

    $notification = [
        'message' => 'Slider Image Updated Successfully',
        'alert-type' => 'success',
    ];

    return redirect()->route('admin.homesliders.index')->with($notification);
    }
    public function destroy(HomeSlider $homeslider)
    {
        // Membersihkan URL agar hanya berisi path di dalam direktori publik
        $filename = public_path(str_replace(url('/'), '', $homeslider->slider_image));

        if (file_exists($filename)) {
            unlink($filename);
        }

        // Hapus rekaman dari database
        $homeslider->delete();

        return redirect()->route('admin.homesliders.index')->with('Success', 'Home Slider berhasil dihapus!');
    }

    public function toggleStatus($id)
    {
        $homeslider = HomeSlider::findOrFail($id);
        $homeslider->status = !$homeslider->status; // Mengubah status aktif menjadi nonaktif dan sebaliknya
        $homeslider->save();

        return redirect()->route('admin.homesliders.index')->with('Success', 'Status Home Slider berhasil diubah.');
    }
}
