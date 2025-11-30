<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('university_id')->constrained()->onDelete('cascade');
            $table->foreignId('manager_id')->nullable()->constrained('users')->onDelete('set null'); // The user assigned as manager

            // Status Machine
            $table->enum('status', [
                'pending',              // Initial state
                'payment_verification', // Student uploaded service fee receipt
                'payment_approved',     // Accountant approved
                'manager_assigned',     // Manager assigned
                'translation_needed',   // If translation is required
                'in_translation',       // Sent to Notary
                'translated',           // Notary finished
                'submitted_to_uni',     // Sent to University
                'contract_received',    // Contract uploaded
                'tuition_verification', // Student uploaded tuition receipt
                'contract_fee_paid',    // Student paid tuition (Verified)
                'enrolled'              // Final success
            ])->default('pending');

            $table->boolean('is_service_fee_paid')->default(false);
            $table->boolean('is_contract_fee_paid')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
