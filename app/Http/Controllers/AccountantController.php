<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;

class AccountantController extends Controller
{
    public function approvedPayments()
    {
        // Service Fee Payments
        $serviceApplications = Application::whereIn('status', ['payment_verification', 'payment_approved'])
            ->with(['user', 'university'])
            ->get();

        // Tuition Fee Payments
        $tuitionApplications = Application::whereIn('status', ['tuition_verification', 'contract_fee_paid', 'enrolled'])
            ->where('is_contract_fee_paid', false) // Show only if not fully processed/verified logic, or maybe show history
            ->orWhere('status', 'tuition_verification') // Explicitly ensure we see pending ones
            ->with(['user', 'university'])
            ->get();

        // Let's refine the query to avoid duplicates if statuses overlap strangely, but here they are distinct phases.
        // Actually, just fetching 'tuition_verification' is enough for "Pending Actions".
        $tuitionApplications = Application::where('status', 'tuition_verification')
            ->with(['user', 'university'])
            ->get();

        return view('accountant.payments', compact('serviceApplications', 'tuitionApplications'));
    }

    public function verifyPayment(Request $request, $applicationId)
    {
        $application = Application::findOrFail($applicationId);

        $application->update([
            'status' => 'payment_approved',
            'is_service_fee_paid' => true,
        ]);

        return redirect()->back()->with('success', 'Service Fee Approved');
    }

    public function verifyTuition(Request $request, $applicationId)
    {
        $application = Application::findOrFail($applicationId);

        $application->update([
            'status' => 'enrolled', // Or 'contract_fee_paid' if there is another step, but prompt says "Enrollment Complete"
            'is_contract_fee_paid' => true,
        ]);

        return redirect()->back()->with('success', 'Tuition Fee Approved. Student Enrolled.');
    }
}
