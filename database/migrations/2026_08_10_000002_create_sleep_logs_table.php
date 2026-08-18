<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sleep_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('date');
            $table->enum('period', ['morning', 'afternoon', 'evening', 'custom'])->default('morning');
            $table->decimal('hours_slept', 4, 2)->nullable();
            $table->integer('awakenings_count')->nullable();
            $table->integer('mood_score')->nullable(); // 1 to 5
            $table->text('raw_text')->nullable();
            $table->json('ai_analysis')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sleep_logs');
    }
};
