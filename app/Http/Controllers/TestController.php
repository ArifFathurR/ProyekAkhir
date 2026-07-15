<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TestController extends Controller
{
    public function index (){
        $data = [
            'kata'=> 'tess'
        ];
        return Inertia::render('Test', $data);
    }

    public function halaman2 (){
        return Inertia::render('Test2');
    }
}
