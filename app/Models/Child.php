<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Child extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'birth_date',
        'gender',
        'is_twin',
        'notes',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'is_twin' => 'boolean',
    ];

    protected $appends = ['age_months'];

    public function getAgeMonthsAttribute(): int
    {
        return $this->birth_date ? (int) $this->birth_date->diffInMonths(now()) : 6;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sleepLogs(): HasMany
    {
        return $this->hasMany(SleepLog::class);
    }
}
