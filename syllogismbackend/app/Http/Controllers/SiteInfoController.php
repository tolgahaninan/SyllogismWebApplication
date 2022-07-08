<?php

namespace App\Http\Controllers;

use App\Models\SiteInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SiteInfoController extends Controller
{
    function read(Request $req)
    {
        $info = SiteInfo::all();
        return response()->json([
            'status' => '200',
            'info' => $info
        ]);
    }

    function update(Request $req)
    {
        $siteInfo = SiteInfo::first();

        if ($siteInfo) {
            $validator = Validator::make($req->all(), [
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'location' => 'required|max:191',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => '422',
                    'validation_errors' => $validator->getMessageBag(),
                ]);
            } else {
                $siteInfo->phone = $req->input('phone');
                $siteInfo->email = $req->input('email');
                $siteInfo->location = $req->input('location');
                $siteInfo->save();
                return response()->json([
                    'status' => '200',
                    'message' => 'Site Info Update Operation Completed Succesfully.'
                ]);
            }
        } else {
            return response()->json([
                'status' => '404',
                'category' => 'Site Info is not found',
            ]);
        }
    }



}
