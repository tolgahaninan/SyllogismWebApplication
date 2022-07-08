<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function register(Request $req)
    {

        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'validation_errors' => $validator->getMessageBag(),
            ]);
        } else {
            $user = User::create([
                'name' => $req->name,
                'email' => $req->email,
                'password' => Hash::make($req->password),
            ]);
            $token = $user->createToken($user->email . '_Token')->plainTextToken;

            return response()->json([
                'status' => '200',
                'name' => $user->name,
                'token' => $token,
                'message' => 'Register operation completed succesfully.'
            ]);
        }
    }

    function login(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'email' => 'required|max:191',
            'password' => 'required'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'validation_errors' => $validator->getMessageBag(),
            ]);
        } else {
            $user = User::where('email', $req->email)->first();

            if (!$user || !Hash::check($req->password, $user->password)) {
                return response()->json([
                    'status' => '401',
                    'message' => 'Invalid Credentials.'
                ]);
            } else {

                if ($user->authType == 1) {
                    $role='admin';
                    $token = $user->createToken($user->email . '_AdminToken', ['server:admin'])->plainTextToken;
                } else if ($user->authType == 2) {
                    $role='editor';
                    $token = $user->createToken($user->email . '_EditorToken', ['server:editor'])->plainTextToken;
                } else {
                    $role='user';
                    $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
                }

                return response()->json([
                    'status' => '200',
                    'name' => $user->name,
                    'token' => $token,
                    'message' => 'Login operation completed succesfully.',
                    'role'=> $role
                ]);
            }
        }
    }


    function logout(Request $req)
    { {
            $req->user()->tokens()->delete();
            return response()->json([
                'status' => '200',
                'message' => 'Logout operation completed succesfully.'
            ]);
        }
    }

    function read(Request $req)
    {
        $users = User::all();
        return response()->json([
            'status' => '200',
            'users' => $users->all(),
        ]);
    }

    function readByUser(Request $req)
    {
        $user = auth('sanctum')->user();
     

        if($user){
            return response()->json([
                'status' => '200',
                'user' => $user,
            ]);

        }else {
            return response()->json([
                'status' => '404',
                'message' => 'There is user found',
            ]);
        }
    }

    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'email' => 'required|email|max:191',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'status' => '400',
                'validation_errors' => $validator->getMessageBag(),
            ]);
        } else {
            $user = User::create([
                'name' => $req->name,
                'email' => $req->email,
                'authType' => $req->authType,
                'password' => Hash::make($req->password),
            ]);
    
            return response()->json([
                'status' => '200',
                'name' => $user->name,
                'message' => 'Admin user create operation completed succesfully.'
            ]);
        }
    }

    function delete($id)
    {
        $user = User::find($id);

        if ($user) {
            $user -> delete();
            return response()->json([
                'status' => '200',
                'category' => 'User is deleted succesfully',
            ]);
        } else {
            return response()->json([
                'status' => '404',
                'category' => 'User is not found',
            ]);
        }
    }

    function update(Request $req, $id)
    {
        $user = User::find($id);

        if ($user) {
            $validator = Validator::make($req->all(), [
                
                'email' => 'email|max:191',
                'password' => 'min:6',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => '422',
                    'validation_errors' => $validator->getMessageBag(),
                ]);
            } else {
                $user->name = $req->input('name');
                $user->email = $req->input('email');
                $user->password = Hash::make($req->input('password'));
                $user->authType = $req->input('authType');
           
                $user->save();

                return response()->json([
                    'status' => '200',
                    'message' => 'User Update Operation Completed Succesfully.'
                ]);
            }
        } else {
            return response()->json([
                'status' => '404',
                'category' => 'User is not found',
            ]);
        }
    }

    function updateByUser(Request $req)
    {
        $user = auth('sanctum')->user();

        if ($user) {
            $validator = Validator::make($req->all(), [
                
                'email' => 'email|max:191',
                'password' => 'min:6',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => '422',
                    'validation_errors' => $validator->getMessageBag(),
                ]);
            } else {
                $user_id = auth('sanctum')->user()->id;
                $user = User::find($user_id);
                $user->name = $req->input('name');
                $user->email = $req->input('email');
                $user->password = Hash::make($req->input('password'));
              

                $user->save();
           

                return response()->json([
                    'status' => '200',
                    'message' => 'User Update Operation Completed Succesfully.'
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
