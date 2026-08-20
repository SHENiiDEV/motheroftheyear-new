<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Mail\WalletTopUpMail;
use App\Models\Invoice;
use App\Models\Transaction;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();

        $invoices = Invoice::where('user_id', $user->id)
            ->latest()
            ->get();

        $transactions = Transaction::where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Billing/Index', [
            'user' => $user,
            'company' => config('company'),
            'invoices' => $invoices,
            'transactions' => $transactions,
        ]);
    }

    public function updateBillingProfile(Request $request)
    {
        $validated = $request->validate([
            'billing_name' => 'required|string|max:255',
            'billing_address' => 'required|string|max:255',
            'billing_city' => 'required|string|max:255',
            'billing_country' => 'required|string|max:255',
            'billing_postal_code' => 'required|string|max:50',
            'vat_number' => 'nullable|string|max:100',
        ]);

        /** @var User $user */
        $user = Auth::user();
        $user->update($validated);

        return back()->with('success', 'Billing information updated successfully!');
    }

    public function topUpWallet(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:10|max:5000',
        ]);

        /** @var User $user */
        $user = Auth::user();
        $amount = (float) $validated['amount'];

        $newBalance = $user->wallet_balance + $amount;
        $user->update(['wallet_balance' => $newBalance]);

        // Record Transaction
        $tx = Transaction::create([
            'user_id' => $user->id,
            'type' => 'deposit',
            'amount' => $amount,
            'description' => 'Wallet Balance Top-Up (Credit Card)',
            'balance_after' => $newBalance,
        ]);

        // Create Invoice
        $invoice = Invoice::create([
            'invoice_number' => 'INV-' . date('Y') . '-' . strtoupper(Str::random(6)),
            'user_id' => $user->id,
            'doctor_id' => null,
            'doctor_name' => 'Wallet Balance Deposit',
            'amount' => $amount,
            'type' => 'wallet_topup',
            'status' => 'paid',
            'billing_snapshot' => [
                'name' => $user->billing_name ?: $user->name,
                'address' => $user->billing_address ?: 'N/A',
                'city' => $user->billing_city ?: 'N/A',
                'country' => $user->billing_country ?: 'N/A',
                'postal_code' => $user->billing_postal_code ?: 'N/A',
                'vat_number' => $user->vat_number ?: 'N/A',
            ],
            'company_snapshot' => config('company'),
        ]);

        // Send WalletTopUpMail with PDF Invoice Attachment
        try {
            Mail::to($user->email)->send(new WalletTopUpMail($user, $tx));
        } catch (\Throwable $e) {
            Log::warning("Failed to send WalletTopUpMail: {$e->getMessage()}");
        }

        return back()->with('success', "Successfully added €{$amount} to your wallet balance!");
    }

    public function downloadInvoice(int $id)
    {
        /** @var User $user */
        $user = Auth::user();

        $invoice = Invoice::where('id', $id)->first();

        if ($invoice) {
            abort_if($invoice->user_id !== $user->id, 403);
            $pdf = Pdf::loadView('pdf.wallet_invoice', [
                'payment' => $invoice,
                'user' => $user,
            ]);
            $ref = $invoice->gateway_reference;
            return $pdf->download("Invoice_{$ref}.pdf");
        }

        $tx = Transaction::where('id', $id)->firstOrFail();
        abort_if($tx->user_id !== $user->id, 403);

        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $tx,
            'user' => $user,
        ]);
        $ref = $tx->gateway_reference;
        return $pdf->download("Invoice_{$ref}.pdf");
    }
}
