<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function getAll() 
    {
        $contacts = Contact::all();

        return response()->json($contacts);
    }

    public function save(Request $req) 
    {
        $req->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string'
        ]);

        Contact::create([
            'name' => $req->name,
            'email' => $req->email,
            'subject' => $req->subject,
            'message' => $req->message,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Mensagem enviada com sucesso.'
        ], 201);
    }

    public function update(Request $req) 
    {

        $req->merge(['id' => $req->route('id')]);

        $req->validate([
            'id' => 'required'
        ]);

        Contact::where('id', $req->id)->update([
            'read' => true
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Mensagem marcada como lida.'
        ]);
    }
}
