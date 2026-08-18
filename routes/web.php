<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\Client\BillingController;
use App\Http\Controllers\Client\DashboardController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Public Doctor Catalog & Subscription Landing
Route::get('/', [CatalogController::class, 'index'])->name('catalog');

// Legal Routes
Route::get('/privacy-policy', [LegalController::class, 'privacyPolicy'])->name('legal.privacy');
Route::get('/terms-of-service', [LegalController::class, 'termsOfService'])->name('legal.terms');
Route::get('/medical-disclaimer', [LegalController::class, 'medicalDisclaimer'])->name('legal.disclaimer');

// Authenticated Mother Client Portal
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/log', [DashboardController::class, 'submitWebLog'])->name('client.log');
    Route::post('/dashboard/specialist', [DashboardController::class, 'updateSpecialist'])->name('client.specialist');
    Route::post('/dashboard/sos', [DashboardController::class, 'triggerSosAlert'])->name('client.sos');
    Route::post('/dashboard/child', [DashboardController::class, 'createChild'])->name('client.child');

    // Billing, Wallet & Invoices Routes
    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');
    Route::post('/billing/profile', [BillingController::class, 'updateBillingProfile'])->name('billing.profile');
    Route::post('/billing/topup', [BillingController::class, 'topUpWallet'])->name('billing.topup');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
