<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;

class ExpensesController extends Controller
{
    public function index(Request $request)
    {
        return Expense::all()->toJson();
    }

    public function store(Request $request)
    {
        return Expense::create($request->all());
    }
}
