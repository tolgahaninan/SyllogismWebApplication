<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LikeController extends Controller
{
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'product_id' => 'required',
            'like' => 'required'
        ]);
        $user_id = auth('sanctum')->user()->id;
        $product_id = $req->input('product_id');
        $commentInput = $req->input('like');

        $productCheck = Product::where('id',$product_id)->first();
        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->getMessageBag(),
            ]);

        }else {

        if($productCheck){
            if(Like::where('product_id',$product_id)->where('user_id',$user_id)->exists()){
                Like::where('product_id',$product_id)->where('user_id',$user_id)->delete();
                return response()->json([
                    'status' => '409',
                    'message' => 'Product Can be liked once.',
                ]);
            }else {

               $like = new Like;
               $like->user_id = $user_id;
               $like->product_id = $product_id;
               $like->like = $commentInput;
               $like->save();

               return response()->json([
                'status' => '200',
                'message' => 'Like has been added.',
                'likes' => $like
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
        $like = Like::where('product_id',$product_id)->where('user_id',$user_id);

        if ($user_id) {

            if($like){
                $like -> delete();
                return response()->json([
                    'status' => '200',
                    'message' => 'Like is deleted succesfully',
                ]);
            }else {
                return response()->json([
                    'status' => '404',
                    'message' => 'Like is not found',
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
        $likes = Like::where('product_id',$product_id)->where('user_id',$user_id)->exists();

        if($likes){
            $likes = Like::where('product_id',$product_id)->where('user_id',$user_id)->get();
            return response()->json([
                'status' => '200',
                'likes' => $likes,
            ]);

        }else {
            return response()->json([
                'status' => '404',
                'message' => 'Product is not liked by user',
                'likes' => $likes,
            ]);
        }
      
    }

    function readByUser()
    {
        $user_id = auth('sanctum')->user()->id;
        $likes = Like::where('user_id',$user_id)->exists();

        if($likes){
            $likes = Like::where('user_id',$user_id)->get();
            return response()->json([
                'status' => '200',
                'likes' => $likes,
            ]);

        }else {
            return response()->json([
                'status' => '404',
                'message' => 'There is no liked product by user',
                'likes' => $likes,
            ]);
        }
      
    }

   
}
