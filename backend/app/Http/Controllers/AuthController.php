<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function me() 
    {
        if (!$user = auth()->user())
            return response()->json([
                'status' => 'error',
                'message' => 'Não autenticado.'
            ], 401);

	    return response()->json($user);
    }

    public function login(Request $req)
    {

        $token = auth()->attempt([ 
            'email' => $req->identifier,
            'password' => $req->password
        ]);

        if (!$token)
        {
            $token = auth()->attempt([
                'name' => $req->identifier,
                'password' => $req->password
            ]);
            if (!$token)
                return response()->json([
                    'status' => 'error',
                    'message' => 'Credenciais erradas.'
                ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Você está logado com sucesso.',
            'token' => $token
        ]);
    }
}
