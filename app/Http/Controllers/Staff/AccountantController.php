<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

class AccountantController extends Controller
{
    public function dashboard()
    {
        $applications = Application::where('status', 'service_fee_pending')->with('user', 'university')->get();
        return view('accountant.dashboard', compact('applications'));
    }

    public function approvePayment($applicationId)
    {
        $application = Application::findOrFail($applicationId);

        if ($application->status === 'service_fee_pending') {
            $application->update(['status' => 'service_fee_paid']);
            return redirect()->back()->with('success', 'Payment approved.');
        }

        return redirect()->back()->with('error', 'Application is not pending payment approval.');
    }
}
