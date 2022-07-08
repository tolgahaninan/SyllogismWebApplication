<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CategoryController extends Controller
{

    public function create(Request $req)
    {


        $validator = Validator::make($req->all(), [
            'meta_title' => 'required|max:191',
            'slug' => 'required|max:191',
            'name' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => '400',
                'validation_errors' => $validator->getMessageBag(),
            ]);
        } else {
            $category = new Category();
            $category->meta_title = $req->input('meta_title');
            $category->meta_keyword = $req->input('meta_keyword');
            $category->meta_description = $req->input('meta_description');
            $category->slug = $req->input('slug');
            $category->name = $req->input('name');
            $category->description = $req->input('description');
            $category->save();

            return response()->json([
                'status' => '200',
                'message' => 'Category Create Operation Completed Succesfully.'
            ]);
        }
    }

    function read(Request $req)
    {
        $category = Category::all();
        return response()->json([
            'status' => '200',
            'category' => $category,
        ]);
    }

    
    function readFeatured (Request $req) {
        $category = Category::where('featured', '1')->take(3)->get();
        if($category){
            return response()->json([
                'status' => '200',
                'featuredCategories' =>  $category,
            ]);
        }else {
            return response()->json([
                'status' => '400',
                'mesage' => 'There is no available Category',
            ]);
            
        }
    }
    function update(Request $req, $id)
    {
        $category = Category::find($id);

        if ($category) {
            $validator = Validator::make($req->all(), [
                'meta_title' => 'required|max:191',
                'slug' => 'required|max:191',
                'name' => 'required|max:191',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => '422',
                    'validation_errors' => $validator->getMessageBag(),
                ]);
            } else {
                $category->meta_title = $req->input('meta_title');
                $category->meta_keyword = $req->input('meta_keyword');
                $category->meta_description = $req->input('meta_description');
                $category->slug = $req->input('slug');
                $category->name = $req->input('name');
                $category->description = $req->input('description');
                $category->save();

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

    function delete($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category -> delete();
            return response()->json([
                'status' => '200',
                'message' => 'Category is deleted succesfully',
            ]); 
        } else {
            return response()->json([
                'status' => '404',
                'message' => 'Category is not found',
            ]);
        }
    }
}
