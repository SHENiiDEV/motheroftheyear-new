<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('doctor_id')->nullable();
            $table->string('doctor_name')->nullable();
            $table->decimal('amount', 10, 2);
            $table->enum('type', ['subscription', 'wallet_topup'])->default('subscription');
            $table->string('status')->default('paid');
            $table->json('billing_snapshot')->nullable();
            $table->json('company_snapshot')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
