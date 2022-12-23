<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Cart;

class CartController extends Controller
{
    public function getAll(Request $req)
    {
        $cart = Cart::where('user_id', $_SERVER['REMOTE_ADDR'])->get();
        return response()->json($cart);
    }

    public function saveItem(Request $req)
    {
        $annex = $req->file('annex')->storePublicly('annexes', 'public');

        Cart::create([
            'user_id' => $_SERVER['REMOTE_ADDR'],
            'tissue' => $req->tissue,
            'quantity' => $req->quantity,
            'template_name' => $req->template_name,
            'template_id' => $req->template_id,
            'annex' => $annex
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Item adicionado ao carrinho com sucesso!'
        ]);
    }

    public function deleteItem(Request $req)
    {
        $item = Cart::where('id', $req->id)->first();
        unlink(public_path().'/'.$item->annex);
        Cart::where('id', $req->id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Item deletado do carrinho com sucesso!'
        ]);
    }

    public function updateMultipleItems(Request $req)
    {
        $user_ip = $_SERVER['REMOTE_ADDR'];
        $items = $req->items;
        
        foreach ($items as $item)
        {
            $item = json_decode(json_encode($item));
            $cartItem = Cart::where('id', $item->id)
            ->where('user_id', $user_ip)
            ->first();
            $cartItem->quantity = $item->quantity;
            $cartItem->tissue = $item->tissue;

            // vai atualizar o item somente se alguma mudança tiver sido feita
            $cartItem->save();
        }
    }
}
