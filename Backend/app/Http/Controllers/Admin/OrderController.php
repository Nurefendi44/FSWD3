<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCart;
use Illuminate\Http\Request;
use Twilio\Rest\Client; // Import Twilio Client

class OrderController extends Controller
{
    public function Order(Request $request, $products_id)
    {
        $visitor = auth()->guard('api-visitor')->user();
        $product = Product::findOrFail($request->products_id);
        $productcart = ProductCart::findOrFail($request->productcarts_id);

        $request->validate([
            'delivery_address' => 'required',
            'phone_number' => 'required',
            'city' => 'required',
        ]);

        date_default_timezone_set("Asia/Jakarta");
        $request_time = date('h:i:sa');
        $request_date = date('d-m-Y');

        $newStock = $product->stock - $productcart->quantity;
        if ($newStock < 0) {
            return response()->json(['error' => 'Insufficient stock.']);
        }
        $product->update(['stock' => $newStock]);


        Order::create([
            'products_id' => $product->id,
            'visitors_id' => $visitor->id,
            'productcarts_id' => $productcart->id,
            'products_name' => $product->product_name,
            'visitors_name' => $visitor->name,
            'email' => $visitor->email,
            'variant' => $productcart->variant,
            'size' => $productcart->size,
            'quantity' => $productcart->quantity,
            'price' => $product->price,
            'total_price' => $productcart->total_price,
            'delivery_address' => $request->delivery_address,
            'phone_number' => $request->phone_number,
            'city' => $request->city,
            'products_image'=>$product->product_image,
            'order_date' => $request_date,
            'order_time' => $request_time,
            'order_status' => "Pending",
        ]);

        $message = "Pesanan baru telah diterima. Produk: " . $product->product_name;

        $adminPhoneNumber = 'whatsapp:+6281336425621';

        $accountSid = 'AC4d5ab229b6a5ea1de91e4476bad2b110';
        $authToken = '00d1ce3eb0fa058a4ead04aa573394b5';
        $yourTwilioPhoneNumber = '+14155238886';
        $twilio = new Client($accountSid, $authToken);

        try {
            $twilio->messages->create(
                $adminPhoneNumber,
                array(
                    "from" => "whatsapp:$yourTwilioPhoneNumber",
                    "body" => $message,
                )
            );

            return response()->json(['message' => 'Order Input Succesfully!']);
        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function OrderListByVisitor(Request $request)
    {
        $visitor = auth()->guard('api-visitor')->user();
        if (!$visitor) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $result = Order::where('email', $visitor->email)
            ->orderBy('id', 'ASC')
            ->get();

        return $result;
    }

    //Backend
    public function PendingOrder()
    {
        $orders = Order::where('order_status', 'Pending')->orderBy('id', 'DESC')->get();
        return view('orders.pending_orders', compact('orders'));
    }

    public function ProcessingOrder()
    {
        $orders = Order::where('order_status', 'Processing')->orderBy('id', 'DESC')->get();
        return view('orders.processing_orders', compact('orders'));
    }

    public function CompletedOrder()
    {
        $orders = Order::where('order_status', 'Complete')->orderBy('id', 'DESC')->get();
        return view('orders.complete_orders', compact('orders'));
    }

    public function OrderDetails($id)
    {
        $order = Order::findOrFail($id);
        return view('orders.order_details', compact('order'));
    }

    public function PendingToProcessing($id)
    {
        Order::findOrFail($id)->update([
            'order_status' => 'Processing',
            'status'       => 'Paid'
        ]);
        $notification = array(
            'message' => 'Order Processing Successfully',
            'alert-type' => 'success',
        );
        return redirect()->route('admin.pending.order')->with($notification);
    }

    public function ProcessingToCompleted($id)
    {
        Order::findOrFail($id)->update([
            'order_status' => 'Complete',
        ]);
        $notification = array(
            'message' => 'Order Completed Successfully',
            'alert-type' => 'success',
        );
        return redirect()->route('admin.processing.order')->with($notification);
    }

    public function DeleteOrder($id)
    {
        Order::find($id)->delete();
        $notification = array(
            'message' => 'Order Deleted Successfully',
            'alert-type' => 'success',
        );
        return redirect()->route('admin.completed.order')->with($notification);
    }

}

