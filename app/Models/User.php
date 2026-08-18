<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'telegram_id',
        'telegram_username',
        'specialist_id',
        'subscription_tier',
        'subscription_status',
        'weekly_price',
        'wallet_balance',
        'invite_token',
        'billing_name',
        'billing_address',
        'billing_city',
        'billing_country',
        'billing_postal_code',
        'vat_number',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'weekly_price' => 'decimal:2',
            'wallet_balance' => 'decimal:2',
            'telegram_id' => 'integer',
            'specialist_id' => 'integer',
        ];
    }

    protected $appends = ['specialist'];

    public static function getSpecialistConfig(int $id): array
    {
        $specialists = [
            1 => [
                'id' => 1,
                'name' => 'Dr. Sarah Jenkins, M.S., C.I.S.C.',
                'title' => 'Certified Infant Sleep Consultant',
                'price' => 49.00,
                'period' => 'week',
                'avatar' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
                'tier' => 'Standard Care',
                'alma_mater' => 'Yale School of Nursing',
                'diplomas' => ['Certified Infant Sleep Consultant (CISC)', 'IACSC Board Accredited', 'Newborn Circadian Rhythms Diploma'],
                'experience' => '8+ Years | 1,400+ Families',
                'bio' => 'Certified sleep consultant specializing in gentle 0-12 month sleep routines, nap scheduling, and soothing techniques.',
                'specialties' => ['Nap Schedule Optimization', 'Gentle Soothing Methods', 'Newborn Circadian Setup'],
            ],
            2 => [
                'id' => 2,
                'name' => 'Dr. Emily Carter, M.D., FAAP',
                'title' => 'Board-Certified Pediatrician & Sleep Expert',
                'price' => 99.00,
                'period' => 'week',
                'avatar' => '/images/emily_carter.jpg',
                'tier' => 'Clinical Care',
                'alma_mater' => 'Johns Hopkins University School of Medicine',
                'diplomas' => ['Doctor of Medicine (M.D.) Johns Hopkins', 'Fellow of the American Academy of Pediatrics (FAAP)', 'Board Certified Pediatric Sleep Medicine'],
                'experience' => '14+ Years | 2,800+ Families',
                'bio' => 'Senior pediatrician specializing in sleep regressions (4-month & 8-month), colic management, and night-weaning transitions.',
                'specialties' => ['4-Month & 8-Month Sleep Regressions', 'Colic & Silent Reflux', 'Night-Weaning Transitions'],
            ],
            3 => [
                'id' => 3,
                'name' => 'Dr. Amanda Vance, M.D., Ph.D.',
                'title' => 'Chief Pediatric Neurologist',
                'price' => 199.00,
                'period' => 'week',
                'avatar' => 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
                'tier' => 'Neurological Executive',
                'alma_mater' => 'Harvard Medical School & Mayo Clinic',
                'diplomas' => ['M.D. Harvard Medical School', 'Ph.D. in Chronobiology & Pediatric Neuroscience', 'Diplomate American Board of Clinical Sleep Medicine'],
                'experience' => '18+ Years | 3,900+ Families',
                'bio' => 'Specializes in neurological sleep optimization for high-sensitivity infants, circadian rhythm alignment, and maternal postpartum recovery.',
                'specialties' => ['High-Sensitivity Infant Sleep', 'Chronobiology Alignment', 'Postpartum Sleep Recovery'],
            ],
            4 => [
                'id' => 4,
                'name' => 'Dr. Marcus Sterling, M.D., Sc.D.',
                'title' => 'Clinical Director of Infant Sleep Architecture',
                'price' => 299.00,
                'period' => 'week',
                'avatar' => '/images/marcus_sterling.jpg',
                'tier' => 'Clinical Director',
                'alma_mater' => 'Stanford University School of Medicine',
                'diplomas' => ['M.D. Stanford Medicine', 'Doctor of Science (Sc.D.) Pediatric Physiology', 'Double Board Certified in Pediatrics & Sleep Architecture'],
                'experience' => '22+ Years | 5,200+ Families',
                'bio' => 'World-renowned authority on infant sleep architecture, twin and multiples sleep synchronization, and post-illness sleep rehabilitation.',
                'specialties' => ['Twin & Multiples Sleep Sync', 'Post-Illness Sleep Rehab', 'Complex Chrono-Disruptions'],
            ],
            5 => [
                'id' => 5,
                'name' => 'Dr. Victoria Montgomery, M.D., FRCP',
                'title' => 'Professor of Maternal & Pediatric Medicine',
                'price' => 499.00,
                'period' => 'week',
                'avatar' => '/images/victoria_montgomery.jpg',
                'tier' => 'VIP Concierge Chair',
                'alma_mater' => 'Oxford University & Mayo Clinic Fellow',
                'diplomas' => ['Fellow of the Royal College of Physicians (FRCP)', 'Professor of Pediatric Sleep Science Oxford', 'International Chair of Maternal-Fetal Wellness'],
                'experience' => '26+ Years | 6,800+ Families',
                'bio' => 'Provides VIP concierge sleep management, total maternal wellness synchronization, and 24/7 dedicated priority sleep tracking.',
                'specialties' => ['VIP 24/7 Concierge Tracking', 'Total Family Sleep Alignment', 'Holistic Postpartum Recovery'],
            ],
        ];

        return $specialists[$id] ?? $specialists[2];
    }

    public function getSpecialistAttribute(): array
    {
        return self::getSpecialistConfig($this->specialist_id ?? 2);
    }

    public function children(): HasMany
    {
        return $this->hasMany(Child::class);
    }

    public function sleepLogs(): HasMany
    {
        return $this->hasMany(SleepLog::class);
    }

    public function alerts(): HasMany
    {
        return $this->hasMany(Alert::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
