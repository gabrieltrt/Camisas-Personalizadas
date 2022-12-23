<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;

class CustomAreaController extends Controller
{
    public function getAll() {
        $custom_areas = Area::all();

        return response()->json($custom_areas);
    }

    public function get(Request $req) {

        $custom_areas = Area::where('template_id', $req->id)->get();

        return response()->json($custom_areas);
    }
}
