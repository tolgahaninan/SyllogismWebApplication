<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Input\Input;

class ProductController extends Controller
{
    function read(Request $req)
    {
        $product = Product::all();
        return response()->json([
            'status' => '200',
            'products' => $product,
        ]);
    }

    

    function readByCategory($categoryName)

    {
        $category = Category::where('name', $categoryName)->where('status', '0')->first();


        if ($category) {
            $product = Product::where('category_id', $category->id)->where('status', '0')->get();
            if($product){
                return response()->json([
                    'status' => '200',
                    'product' => $product,
                    'category' => $category
                  
                ]);
            }else {
                return response()->json([
                    'status' => '400',
                    'mesage' => 'There is no available Products',
                ]);
                
            }
        }
    }

    

    function readById ($id) {

        $product = Product::where('id', $id)->where('status', '0')->first();
        if($product){
            return response()->json([
                'status' => '200',
                'product' =>  $product,
            ]);
        }else {
            return response()->json([
                'status' => '400',
                'mesage' => 'There is no available Products',
            ]);
            
        }

    }

    function readFeatured (Request $req) {
        $product = Product::where('featured', '1')->take(6)->get();
        if($product){
            return response()->json([
                'status' => '200',
                'featuredProducts' =>  $product,
            ]);
        }else {
            return response()->json([
                'status' => '400',
                'mesage' => 'There is no available Products',
            ]);
            
        }
    }

    function delete($id)
    {
        $product = Product::find($id);

        if ($product) {
            $product->delete();
            return response()->json([
                'status' => '200',
                'message' => 'Product is deleted succesfully',
            ]);
        } else {
            return response()->json([
                'status' => '404',
                'message' => 'Product is not found',
            ]);
        }
    }
    public function create(Request $req)
    {


        $validator = Validator::make($req->all(), [
            'category_id' => 'required|max:191',
            'slug' => 'required|max:191',
            'name' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'brand' => 'required|max:191',
            'selling_price' => 'required|max:191',
            'original_price' => 'required|max:191',
            'quantity' => 'required|max:191',
            'image' => 'required|max:1911',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'status' => '422',
                'validation_errors' => $validator->getMessageBag(),
            ]);
        } else {
            $product = new Product;
            $product->category_id = $req->input('category_id');
            $product->slug = $req->input('slug');
            $product->name = $req->input('name');
            $product->description = $req->input('description');
            $product->meta_title = $req->input('meta_title');
            $product->meta_keyword = $req->input('meta_keyword');
            $product->meta_description = $req->input('meta_description');
            $product->brand = $req->input('brand');
            $product->selling_price = $req->input('selling_price');
            $product->original_price = $req->input('original_price');
            $product->quantity = $req->input('quantity');
            $product->image = $req->input('image');
            $product->featured = $req->input('featured') == true ? '1' : '0';
            $product->popular = $req->input('popular') == true ? '1' : '0';
            $product->status = $req->input('status') == true ? '1' : '0';
            $product->save();

            return response()->json([
                'status' => '200',
                'message' => 'Admin product create operation completed succesfully.'
            ]);
        }
    }

    function update(Request $req, $id)
    {
        $product = Product::find($id);

        if ($product) {
            $validator = Validator::make($req->all(), [
                'category_id' => 'required|max:191',
                'slug' => 'max:191',
                'name' => 'required|max:191',
                'meta_title' => 'required|max:191',
                'brand' => 'required|max:191',
                'selling_price' => 'required|max:191',
                'original_price' => 'required|max:191',
                'quantity' => 'required|max:191',
                'image' => 'required|max:1911',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => '422',
                    'validation_errors' => $validator->getMessageBag(),
                ]);
            } else {
                $product->category_id = $req->input('category_id');
                $product->slug = $req->input('slug');
                $product->name = $req->input('name');
                $product->description = $req->input('description');
                $product->meta_title = $req->input('meta_title');
                $product->meta_keyword = $req->input('meta_keyword');
                $product->meta_description = $req->input('meta_description');
                $product->brand = $req->input('brand');
                $product->selling_price = $req->input('selling_price');
                $product->original_price = $req->input('original_price');
                $product->quantity = $req->input('quantity');
                $product->image = $req->input('image');
                $product->featured = $req->input('featured') == true ? '1' : '0';
                $product->popular = $req->input('popular') == true ? '1' : '0';
                $product->status = $req->input('status') == true ? '1' : '0';
                $product->save();

                return response()->json([
                    'status' => '200',
                    'message' => 'Category Update Operation Completed Succesfully.'
                ]);
            }
        } else {
            return response()->json([
                'status' => '404',
                'category' => 'Category is not found',
            ]);
        }
    }
}
