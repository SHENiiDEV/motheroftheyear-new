<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SleepLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'child_id',
        'date',
        'period',
        'hours_slept',
        'awakenings_count',
        'mood_score',
        'raw_text',
        'ai_analysis',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
        'hours_slept' => 'decimal:2',
        'awakenings_count' => 'integer',
        'mood_score' => 'integer',
        'ai_analysis' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function child(): BelongsTo
    {
        return $this->belongsTo(Child::class);
    }
}
