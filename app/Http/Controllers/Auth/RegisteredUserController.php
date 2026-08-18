<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone_number' => 'required|string|max:50',
            'date_of_birth' => 'required|date',
            'billing_address' => 'required|string|max:255',
            'billing_city' => 'required|string|max:255',
            'billing_country' => 'required|string|max:255',
            'billing_postal_code' => 'required|string|max:50',
            'terms' => 'accepted',
        ]);

        $specialistId = $request->input('specialist_id', 2);
        $config = User::getSpecialistConfig($specialistId);

        $fullName = trim($request->name . ' ' . $request->surname);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'date_of_birth' => $request->date_of_birth,
            'specialist_id' => $specialistId,
            'subscription_tier' => strtolower($config['tier']),
            'weekly_price' => $config['price'],
            'wallet_balance' => 300.00,
            'invite_token' => \Illuminate\Support\Str::random(32),
            'subscription_status' => 'active',
            'billing_name' => $fullName,
            'billing_address' => $request->billing_address,
            'billing_city' => $request->billing_city,
            'billing_country' => $request->billing_country,
            'billing_postal_code' => $request->billing_postal_code,
            'agreed_terms' => true,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
