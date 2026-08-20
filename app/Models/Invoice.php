<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'user_id',
        'doctor_id',
        'doctor_name',
        'amount',
        'type',
        'status',
        'billing_snapshot',
        'company_snapshot',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'billing_snapshot' => 'array',
        'company_snapshot' => 'array',
    ];

    protected $appends = ['gateway_reference', 'service_name', 'currency'];

    public function getGatewayReferenceAttribute(): string
    {
        return $this->invoice_number ?: ('INV-' . str_pad($this->id, 6, '0', STR_PAD_LEFT));
    }

    public function getServiceNameAttribute(): string
    {
        return $this->doctor_name ? "Pediatric Sleep Care Subscription: {$this->doctor_name}" : 'Weekly Care Plan Subscription';
    }

    public function getCurrencyAttribute(): string
    {
        return 'EUR';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
