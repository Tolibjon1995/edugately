<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Application;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    public function showRegistrationForm()
    {
        return view('frontend.signup.form');
    }

    public function register(Request $request)
    {
        // Validation logic here

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('student');

        // Create Application
        Application::create([
            'user_id' => $user->id,
            'university_id' => $request->university_id,
            'status' => 'pending',
        ]);

        // Login user
        auth()->login($user);

        return redirect()->route('signup.payment');
    }

    public function paymentStep()
    {
        // Mapped to src/containers/web/pages/singup/Oplata.jsx
        return view('frontend.signup.payment');
    }
}
