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
            $table->foreignId('manager_id')->nullable()->constrained('users')->onDelete('set null');

            // Status Machine
            $table->enum('status', [
                'pending',              // Initial state, waiting for service fee upload
                'service_fee_pending',  // Uploaded, waiting for accountant
                'service_fee_paid',     // Verified by Accountant
                'manager_assigned',     // Manager assigned
                'translation_needed',   // Sent to Notary
                'translated',           // Notary finished
                'contract_received',    // Contract uploaded by Manager
                'tuition_pending',      // Student uploaded tuition receipt
                'completed'             // Admin/Accountant verified tuition -> Enrolled
            ])->default('pending');

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
