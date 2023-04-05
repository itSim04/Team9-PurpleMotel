<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class AuthenticationController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {

            return response()->json([

                'status' => 'error',
                'message' => 'Unauthorized',

            ], 401);
            
        }

        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'data' => new UserResource($user),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
                ]
            ]);

        }
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|numeric|unique:users',
            'gender' => 'required|between:0,3',
            'date_of_birth' => 'required|date',
        ]);
    
        $user = User::create([
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'phone' => $validatedData['phone'],
            'gender' => $validatedData['gender'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'tier' => 0
        ]);
        
        $token = Auth::login($user);
                
        return response()->json([
            'status' => 'success',
            'data' => new UserResource($user),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
                ]
            ], 201);

    }
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
