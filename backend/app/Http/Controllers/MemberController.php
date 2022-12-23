<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\Budget;

class MemberController extends Controller
{
    public function budgetsFromMember(Request $req)
    {
        $budgets = Budget::from('budgets as b')
        ->join('templates as t', 't.id', 'b.template_id')
        ->where('b.member_id', $req->id)
        ->select([
            't.name as template_name',
            'b.annex',
            'b.quantity',
            'b.tissue',
        ])->get();

        return response()->json($budgets);
    }
}
