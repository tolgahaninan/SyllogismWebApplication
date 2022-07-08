<?php

namespace App\Http\Controllers;

use App\Models\Rate;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class RateController extends Controller
{
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'product_id' => 'required',
            'rate' => 'required'
        ]);
        $user_id = auth('sanctum')->user()->id;
        $product_id = $req->input('product_id');
        $rateInput = $req->input('rate');

        $productCheck = Product::where('id',$product_id)->first();
        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->getMessageBag(),
            ]);

        }else {

        if($productCheck){
            if(Rate::where('product_id',$product_id)->where('user_id',$user_id)->exists()){
                return response()->json([
                    'status' => '409',
                    'message' => 'Product Can be rated once.',
                ]);
            }else {

               $rate = new Rate;
               $rate->user_id = $user_id;
               $rate->product_id = $product_id;
               $rate->rate = $rateInput;
               $rate->save();

               return response()->json([
                'status' => '200',
                'message' => 'Rate has been added.',
                'rates' => $rate
            ]);
            }
        }else{
            return response()->json([
                'status' => '404',
                'message' => 'Product is not found.',
            ]);
        }
    }
    }

    function delete($id)
    {
        $user_id = auth('sanctum')->user()->id;
        $product_id = $id;
        $rate = Rate::where('product_id',$product_id)->where('user_id',$user_id);

        if ($user_id) {

            if($rate){
                $rate -> delete();
                return response()->json([
                    'status' => '200',
                    'message' => 'Rate is deleted succesfully',
                ]);
            }else {
                return response()->json([
                    'status' => '404',
                    'message' => 'Rate is not found',
                ]);
            }
           
        } else {
            return response()->json([
                'status' => '404',
                'category' => 'User is not found',
            ]);
        }
    }


    function readByProduct($id)
    {   
        $user_id = auth('sanctum')->user()->id;
        $product_id = $id;
        $rates = Rate::where('product_id',$product_id)->where('user_id',$user_id)->exists();

        if($rates){
            $rates = Rate::where('product_id',$product_id)->where('user_id',$user_id)->get();
            return response()->json([
                'status' => '200',
                'rates' => $rates,
            ]);

        }else {
            return response()->json([
                'status' => '404',
                'message' => 'Product is not rated by user',
                'rates' => $rates,
            ]);
        }
      
    }

}
