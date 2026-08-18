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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
