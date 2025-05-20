<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::post('ahuthenticate', [AuthenticationController::class, 'authenticate']);

Route::get('roleCheck/{id}', [AuthenticationController::class, 'roleCheck'])
    ->middleware(['auth:sanctum', 'role:admin|operator']);

Route::get('permissionCheck', [AuthenticationController::class, 'permissionCheck'])
    ->middleware(['auth:sanctum', 'role:admin|operator']);

Route::get('logout', [AuthenticationController::class, 'logout'])
    ->middleware(['auth:sanctum', 'role:admin|operator']);

Route::get('user/{id}', [AuthenticationController::class, 'user'])
    ->middleware(['auth:sanctum', 'role:admin|operator']);

Route::post('user/update/{id}', [AuthenticationController::class, 'userUpdate'])
    ->middleware(['auth:sanctum', 'role:admin|operator']);

Route::resource('users', UsersController::class)
    ->middleware(['auth:sanctum', 'role:admin|operator']);

Route::put('usersUpdate/{id}', [UsersController::class, 'usersUpdate'])
    ->middleware(['auth:sanctum', 'role:admin|operator']);

Route::get('usersRoles', [UsersController::class, 'roles'])
    ->middleware(['auth:sanctum', 'role:admin|operator']);
