<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Mail\ForgotPasswordSend;
use App\Models\PasswordResetTokens;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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

    public function forgotPassword1(Request $request)
    {


        $data = $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        // Delete all old code that user send before.
        PasswordResetTokens::where('email', $request->email)->delete();

        // Generate random code
        $data['token'] = mt_rand(100000, 999999);

        // Create a new code
        $codeData = PasswordResetTokens::create($data);

        // Send email to user
        Mail::to($request->email)->send(new ForgotPasswordSend($codeData->token));

        return response(['message' => trans('passwords.sent')], 200);
    }

    public function forgotPassword2(Request $request)
    {

            $request->validate([
                'token' => 'required|string|exists:password_reset_tokens',
                'password' => 'required|string|min:8|confirmed',
            ]);
    
            // find the code
            $passwordReset = PasswordResetTokens::firstWhere('token', $request->token);
    
            // check if it does not expired: the time is one hour
            if ($passwordReset->created_at > now()->addHour()) {
                $passwordReset->delete();
                return response(['message' => trans('passwords.code_is_expire')], 422);
            }
    
            // find user's email 
            $user = User::firstWhere('email', $passwordReset->email);
    
            // update user password
            $user->update([
                'password' => Hash::make($request->password),
            ]);
    
            // delete current code 
            $passwordReset->delete();
    
            return response(['message' =>'password has been successfully reset'], 200);
        }

    
}
