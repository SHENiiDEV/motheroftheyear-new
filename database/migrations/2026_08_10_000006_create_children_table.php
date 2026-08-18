<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('children', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->date('birth_date');
            $table->enum('gender', ['boy', 'girl'])->default('boy');
            $table->boolean('is_twin')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::table('sleep_logs', function (Blueprint $table) {
            $table->foreignId('child_id')->nullable()->after('user_id')->constrained('children')->onDelete('cascade');
        });

        Schema::table('alerts', function (Blueprint $table) {
            $table->boolean('is_priority_sos')->default(false)->after('reason');
        });
    }

    public function down(): void
    {
        Schema::table('alerts', function (Blueprint $table) {
            $table->dropColumn('is_priority_sos');
        });

        Schema::table('sleep_logs', function (Blueprint $table) {
            $table->dropForeign(['child_id']);
            $table->dropColumn('child_id');
        });

        Schema::dropIfExists('children');
    }
};
