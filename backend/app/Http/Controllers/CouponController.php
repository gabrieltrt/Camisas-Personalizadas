<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Coupon;

class CouponController extends Controller
{
    public function getAll()
    {
        $coupons = Coupon::all();

        return response()->json($coupons);
    }

    public function save(Request $req)
    {
        $req->validate([
            'code' => 'required|string|regex:/^[^\s]*$/u|unique:coupons,code'
        ], [
            'required' => "O campo :attribute é obrigatório.",
            'code.unique' => "Este cupom já existe no sistema.",
            'code.regex' => "O código do cupom não pode conter espaços."

        ]);

        Coupon::create([
            'code' => $req->code
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cupom promocional criado com sucesso!'
        ]);
    }

    public function delete(Request $req)
    {
        $req->merge([
            'id' => $req->route('id')
        ]);
        $req->validate([
            'id' => 'required|numeric|exists:coupons,id'
        ], [
            'required' => "O campo :attribute é obrigatório.",
            'id.exists' => "Não há um registro com essa identificação."
        ]);

        Coupon::where('id', $req->id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Cupom promocional deletado com sucesso!'
        ]);
    }
}
