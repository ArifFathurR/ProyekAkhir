<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\UserApiController;
// Route::apiResource('users', UserApiController::class);
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\DokumentasiApiController;
Route::get('/', function(){
    return'API';
});

Route::apiResource('users', UserApiController::class);
Route::get('/dokumentasi', [DokumentasiApiController::class, 'index']);
Route::post('/dokumentasi_store', [DokumentasiApiController::class, 'store']);
Route::get('/dokumentasi/{id}', [DokumentasiApiController::class, 'show']);
Route::post('/dokumentasi/{id}', [DokumentasiApiController::class, 'update']);
Route::delete('/dokumentasi/{id}', [DokumentasiApiController::class, 'destroy']);

// Route::prefix('users')->group(function () {
//     Route::get('/', [UserApiController::class, 'index']);         // GET /api/users
//     Route::get('/{id}', [UserApiController::class, 'show']);      // GET /api/users/{id}
//     Route::post('/', [UserApiController::class, 'store']);        // POST /api/users
//     Route::put('/{id}', [UserApiController::class, 'update']);    // PUT /api/users/{id}
//     Route::delete('/{id}', [UserApiController::class, 'destroy']); // DELETE /api/users/{id}
// });

