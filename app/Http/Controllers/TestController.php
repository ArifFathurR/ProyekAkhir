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

    public function test3(){
        $data = [
            ['nama' => "Arif",
            'kelas' => "4 TIC",
            'nim' => "2255301021",],

            ['nama' => "udinn",
            'kelas' => "1 TIC",
            'nim' => "112323232",
            
            ],
        ];

        return Inertia::render('Test3', [
            'data' => $data,
        ]);
    }
}
