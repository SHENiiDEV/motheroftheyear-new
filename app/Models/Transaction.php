<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'description',
        'balance_after',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'balance_after' => 'decimal:2',
    ];

    protected $appends = ['gateway_reference', 'service_name', 'currency', 'status'];

    public function getGatewayReferenceAttribute(): string
    {
        if ($this->type === 'deposit') {
            return 'TOPUP-' . str_pad($this->id, 6, '0', STR_PAD_LEFT);
        }
        return 'WALLET-DEDUCT-' . str_pad($this->id, 6, '0', STR_PAD_LEFT);
    }

    public function getServiceNameAttribute(): string
    {
        return $this->description ?: ($this->type === 'deposit' ? 'Wallet Balance Top-Up' : 'Specialist Weekly Care Subscription');
    }

    public function getCurrencyAttribute(): string
    {
        return 'EUR';
    }

    public function getStatusAttribute(): string
    {
        return 'paid';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
