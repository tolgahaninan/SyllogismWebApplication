<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{
  
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'product_id' => 'required',
            'comment' => 'required|min:6|max:191'
        ]);
        $user_id = auth('sanctum')->user()->id;
        $product_id = $req->input('product_id');
        $commentInput = $req->input('comment');

        $productCheck = Product::where('id',$product_id)->first();
        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->getMessageBag(),
            ]);

        }else {

        if($productCheck){
            if(Comment::where('product_id',$product_id)->where('user_id',$user_id)->exists()){
                return response()->json([
                    'status' => '409',
                    'message' => 'Only one comment can be done for a product.',
                ]);
            }else {

               $comment = new Comment;
               $comment->user_id = $user_id;
               $comment->product_id = $product_id;
               $comment->comment = $commentInput;
               $comment->save();

               return response()->json([
                'status' => '200',
                'message' => 'Comment is added.',
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

    function read($id)
    {
        $user_id = auth('sanctum')->user()->id;
        $product_id = $id;
        $comments = Comment::where('product_id',$product_id)->exists();

        if($comments){
            $comments = Comment::where('product_id',$product_id)->get();
            return response()->json([
                'status' => '200',
                'comments' => $comments,
            ]);

        }else {
            return response()->json([
                'status' => '404',
                'message' => 'There is no comment has been made for the product',
            ]);
        }
      
    }

    function delete($id)
    {
        $user_id = auth('sanctum')->user()->id;
        $product_id = $id;
        $comment = Comment::where('product_id',$product_id)->where('user_id',$user_id);

        if ($user_id) {

            if($comment){
                $comment -> delete();
                return response()->json([
                    'status' => '200',
                    'message' => 'Comment is deleted succesfully',
                ]);
            }else {
                return response()->json([
                    'status' => '404',
                    'message' => 'Comment is not found',
                ]);
            }
           
        } else {
            return response()->json([
                'status' => '404',
                'category' => 'User is not found',
            ]);
        }
    }



  
}
