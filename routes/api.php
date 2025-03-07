<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\API\UserController; // Import UserController
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Leads routes
    Route::post('/leads', [LeadsController::class, 'store']); // Add leads
    Route::get('/leads', [LeadsController::class, 'index']); // Get leads for logged-in user
    Route::delete('/leads/{id}', [LeadsController::class, 'destroy']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user/profile', [UserController::class, 'getProfile']);
        Route::post('/user/profile/update', [UserController::class, 'updateProfile']);
    });
});
