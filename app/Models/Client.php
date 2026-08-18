<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'telegram_id',
        'telegram_username',
        'name',
        'email',
        'specialist_id',
        'invite_token',
        'status',
    ];

    protected $casts = [
        'telegram_id' => 'integer',
    ];

    public function specialist(): BelongsTo
    {
        return $this->belongsTo(User::class, 'specialist_id');
    }

    public function sleepLogs(): HasMany
    {
        return $this->hasMany(SleepLog::class);
    }

    public function alerts(): HasMany
    {
        return $this->hasMany(Alert::class);
    }

    public function activeAlerts(): HasMany
    {
        return $this->hasMany(Alert::class)->where('is_resolved', false);
    }
}
