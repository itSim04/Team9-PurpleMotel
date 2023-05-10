<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Mail\ForgotPasswordSend;
use App\Mail\VerifySend;
use App\Models\LoginAttempts;
use App\Models\PasswordResetTokens;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {

        $last24Hours = Carbon::now()->subHours(24);

        $attempts = LoginAttempts::where('ip', $request->ip())->get()
            ->where('created_at', '>=', $last24Hours);


        if (sizeof($attempts) >= 5) {

            return generateResponse(429);
        }

        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {

            $user = User::all()->firstWhere('email', $request->input('email'));
            if ($user) {

                LoginAttempts::create([

                    'user_id' => $user->id,
                    'ip' => $request->ip()

                ]);
            }

            return response()->json([

                'status' => 'error',
                'message' => 'Unauthorized',

            ], 401);
        }

        $user = Auth::user();

        $permissions = extractPermissions($user->id, $user->type);

        LoginAttempts::where('ip', $request->ip())->delete();

        return response()->json([
            'status' => 'success',
            'data' => new UserResource($user),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],
            'permissions' => $permissions
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
            'tier' => 0,
            'notifications' => 0
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

        return response(['message' => 'password has been successfully reset'], 200);
    }

    public function sendVerifyEmail(Request $request)
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
        Mail::to($request->email)->send(new VerifySend($codeData->token));

        return response(['message' => trans('passwords.sent')], 200);
    }
    public function verifyEmail(Request $request)
    {

        $request->validate([
            'token' => 'required|string|exists:password_reset_tokens',
        ]);

        // find the code
        $passwordReset = PasswordResetTokens::firstWhere('token', $request->token);

        // check if it does not expired: the time is one hour
        if ($passwordReset->created_at > now()->addHour()) {
            $passwordReset->delete();
            return response(['message' => trans('passwords.code_is_expire')], 422);
        }

        // find user's email 
        $user = User::all()->where('email', $passwordReset->email)->first();


        // update user password
        $user->update([
            'email_verified_at' => now(),
        ]);

        // delete current code 
        // $passwordReset->delete();

        return response(['message' => 'email has been successfully verified'], 200);
    }

    public function resetPassword(Request $request)
    {
        // Validate the request data
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        // Retrieve the authenticated user
        $user = User::find(Auth::user()->id);

        // Validate the old password
        if (!Hash::check($request->old_password, $user->password)) {
            return response(['message' => trans('passwords.old_password_incorrect')], 422);
        }

        // Update the user's password
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response(['message' => trans('passwords.password_updated')], 200);
    }
}
