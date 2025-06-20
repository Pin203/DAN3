<?php

// App\Http\Controllers\ProductDetailController.php

namespace App\Http\Controllers;

use App\Models\Product; // Có thể cần dùng đến nếu bạn muốn lấy thông tin trực tiếp từ Product
use App\Models\ProductDetail;
use Illuminate\Http\Request;

class ProductDetailController extends Controller
{
    public function trangchitietTheoProductId($id_product) // Đổi tên hàm và tham số cho rõ ràng
    {
        // Khi tìm bằng id_product, có thể có NHIỀU ProductDetail.
        // Bạn cần quyết định sẽ trả về cái nào hoặc trả về tất cả.

        // Lựa chọn 1: Trả về một ProductDetail MẶC ĐỊNH hoặc ĐẦU TIÊN
        // Đây là cách đơn giản nhất nếu bạn chỉ muốn hiển thị 1 chi tiết ban đầu.
        $detail = ProductDetail::with(['product', 'color', 'size'])
                               ->where('id_product', $id_product)
                               ->first(); // Lấy bản ghi đầu tiên tìm thấy

        if (!$detail) {
            return response()->json(['message' => 'Không tìm thấy chi tiết sản phẩm cho sản phẩm này'], 404);
        }

        return response()->json([
            'id' => $detail->id_product_detail, // Vẫn trả về id_product_detail của chi tiết cụ thể này
            'id_product' => $detail->product->id_product,
            'name' => $detail->product->name,
            'price' => $detail->product->price,
            'discount' => $detail->product->discount ?? 0,
            'final_price' => $detail->product->price * (1 - ($detail->product->discount ?? 0) / 100),
            'img' => asset($detail->product->img),
            'mota' => $detail->mota, // hoặc $detail->product->description nếu bạn muốn mô tả từ bảng Product
            'sl' => $detail->sl,
            'color' => optional($detail->color)->name,
            'size' => optional($detail->size)->name,
            // Thêm danh sách các chi tiết khác của sản phẩm này để frontend có thể chọn
            'other_details' => ProductDetail::where('id_product', $id_product)
                                            ->with(['color', 'size'])
                                            ->get()
                                            ->map(function($d) {
                                                return [
                                                    'id_product_detail' => $d->id_product_detail,
                                                    'color' => optional($d->color)->name,
                                                    'size' => optional($d->size)->name,
                                                    'sl' => $d->sl
                                                ];
                                            }),
        ]);
    }

   
}

// namespace App\Http\Controllers;

// use App\Models\Product;
// use App\Models\Category;
// use App\Models\ProductDetail;
// use Illuminate\Http\Request;

// class ProductDetailController extends Controller
// {
//     public function trangchitiet($id)
//     {
//         $detail = ProductDetail::with(['product', 'color', 'size'])->find($id);

//         if (!$detail) {
//             return response()->json(['message' => 'Không tìm thấy chi tiết sản phẩm'], 404);
//         }

//         return response()->json([
//             'id' => $detail->id_product_detail,
//             'id_product' => $detail->product->id_product,
//             'name' => $detail->product->name,
//             'price' => $detail->product->price,
//             'discount' => $detail->product->discount ?? 0,
//             'final_price' => $detail->product->price * (1 - ($detail->product->discount ?? 0) / 100),
//             'img' => asset($detail->product->img),
//             'mota' => $detail->mota,
//             'sl' => $detail->sl,
//             'color' => optional($detail->color)->name,
//             'size' => optional($detail->size)->name,
//         ]);
//     }
// }
 