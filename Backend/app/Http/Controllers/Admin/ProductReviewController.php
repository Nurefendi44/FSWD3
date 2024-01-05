<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\ProductReview;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductReviewController extends Controller
{
    public function getReview()
    {
        $reviews = ProductReview::where('status', 1)->get();

        return response()->json([
            "message" => "Succesfully fetched review.",
            "data" => $reviews
        ], Response::HTTP_OK);
    }
    public function showReviewById(ProductReview $reviews, $id)
    {
        $reviews = ProductReview::where('status', 1)->findOrFail($id);
        return response()->json([
            "message" => "Succesfully fetched Review By Id.",
            "data" => $reviews
        ], Response::HTTP_OK);
    }
    public function getReviewByVisitor()
    {
        $visitor = auth()->guard('api-visitor')->user();

        if (!$visitor) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $reviews = ProductReview::where('visitors_id', $visitor->id)
                                ->where('status', 1)
                                ->get();

        return response()->json([
            'message' => 'Reviews successfully retrieved for the authenticated visitor.',
            'data' => $reviews
        ], 200);
    }
    public function index(Request $request)
    {
    $visitors = Visitor::all();
    $products = Product::all();
    $keyword = $request->input('keyword');

    $reviews = ProductReview::where('reviewer_name', 'LIKE', "%$keyword%")
        ->orWhere('reviewer_comments', 'LIKE', "%$keyword%")
        ->orderBy('id', 'asc')
        ->paginate(10);

    session()->put('review_keyword', $keyword);

    return view('reviews.index', compact('reviews', 'products', 'visitors'));
    }
    public function store(Request $request, $products_id)
    {
    $visitor = auth()->guard('api-visitor')->user();
    $product = Product::findOrFail($products_id);
    $order = Order::findOrFail($request->orders_id);

    $existingReview = ProductReview::where('orders_id', $request->orders_id)
        ->where('visitors_id', $visitor->id)
        ->first();

    if ($existingReview) {
        return response()->json(['error' => 'You have already reviewed this order.'], Response::HTTP_BAD_REQUEST);
    }

    $request->validate([
        'reviewer_image' => 'required',
        'reviewer_rating' => 'required',
        'reviewer_comments' => 'required'
    ], [
        'reviewer_image.required' => 'Review Image is required!',
    ]);

    $image = $request->file('reviewer_image');
    $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
    $image->move(public_path('img/reviewer_images'), $name_gen);
    $save_url = url('img/reviewer_images/' . $name_gen);
    ProductReview::create([
        'products_id' => $products_id,
        'visitors_id' => $visitor->id,
        'orders_id' => $request->orders_id,
        'reviewer_name' => $visitor->name,
        'reviewer_rating' => $request->reviewer_rating,
        'reviewer_comments' => $request->reviewer_comments,
        'reviewer_image' => $save_url,
    ]);

    return response()->json(['message' => 'Review Input Successfully!']);
    }

    public function destroy(ProductReview $review)
    {

         $filename = public_path(str_replace(url('/'), '', $review->reviewer_image));

         if (file_exists($filename)) {
             unlink($filename);
         }

        $review->delete();
        return redirect()->route('admin.reviews.index')->with('Review Succesfully Deleted!');
    }
    public function toggleStatus($id)
    {
        $review = ProductReview::findOrFail($id);
        $review->status = !$review->status; 
        $review->save();

        return redirect()->route('admin.reviews.index')->with('Status Review Succesfully Updated!');
    }
}
