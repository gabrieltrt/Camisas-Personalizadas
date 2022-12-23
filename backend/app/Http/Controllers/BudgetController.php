<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Budget;
use App\Models\Image;
use App\Models\Cart;
use App\Models\Member;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;

class BudgetController extends Controller
{
    public function getAll(Request $req)
    {

	    return response()->json(Budget::all());
    }

    public function save(Request $req)
    {
        $req->validate([
            'email' => 'required|email',
            'whatsapp' => 'required|string',
            'birthdate' => 'required_without:cnpj|required_with:cpf|prohibited_if:cnpj,present',
            'cpf' => 'required_without:cnpj|prohibited_if:cnpj,present',
            'cnpj' => 'required_without:cpf|prohibited_if:cpf,present', 
            'discountCoupon' => 'sometimes|exists:coupons,code'
        ], [
            'required_without' => 'O campo :attribute é obrigatório quando o campo :values não está presente'
        ]);

        $ip = $_SERVER['REMOTE_ADDR'];
        $items = Cart::where('user_id', $ip)->get();

        $member = Member::create([
            'email' => $req->email,
            'phone' => $req->whatsapp,
            'birthdate' => $req->cnpj ? null : $req->birthdate,
            'cnpj' => $req->cpf ? null : $req->cnpj,
            'cpf' => $req->cnpj ? null : $req->cpf
        ]);

        foreach ($items as $item)
        {
            Budget::create([
                'template_id' => $item->template_id,
                'member_id' => $member->id,
                'tissue' => $item->tissue,
                'quantity' => $item->quantity,
                'annex' => $item->annex,
                'coupon' => $req->discountCoupon
            ]);

            
        }
        Cart::where('user_id', $ip)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Pedido realizado com sucesso.'
        ]);
    }

    public function users(Request $req)
    {
        $members = Member::from('members as m')->select([ 'm.id', 'm.email', 'm.phone' ])
        ->join('budgets as b', 'b.member_id', 'm.id')
        ->distinct()
        ->get();

        return response()->json($members);
    }
}
