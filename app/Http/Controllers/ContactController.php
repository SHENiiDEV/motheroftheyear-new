<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact', [
            'company' => config('company'),
        ]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $recipientEmail = config('company.email', 'support@caringandsupportive.co.uk');

        try {
            Mail::to($recipientEmail)->send(new ContactMessageMail(
                $validated['name'],
                $validated['email'],
                $validated['subject'],
                $validated['message']
            ));
        } catch (\Throwable $e) {
            Log::warning("Failed to send ContactMessageMail: {$e->getMessage()}");
        }

        return back()->with('success', 'Your support ticket has been received! Our client team will respond within 4 business hours.');
    }
}
