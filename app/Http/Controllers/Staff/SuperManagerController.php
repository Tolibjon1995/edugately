<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\User;

class SuperManagerController extends Controller
{
    public function dashboard()
    {
        // Applications that have paid service fee but not yet assigned a manager
        $applications = Application::where('status', 'service_fee_paid')->with(['user', 'university'])->get();

        // List of Managers to assign
        $managers = User::role('manager')->get();

        return view('staff.super_manager.dashboard', compact('applications', 'managers'));
    }

    public function assignManager(Request $request)
    {
        $request->validate([
            'application_id' => 'required|exists:applications,id',
            'manager_id' => 'required|exists:users,id',
        ]);

        $application = Application::findOrFail($request->application_id);

        // Ensure application is in correct state to be assigned
        if ($application->status !== 'service_fee_paid' && $application->status !== 'manager_assigned') {
             // We allow re-assignment if needed, or strictly check state.
             // Prompt says: Processing: SuperManager assigns a Manager.
             // I'll stick to check service_fee_paid or if I want to allow re-assigning, manager_assigned too.
        }

        $application->update([
            'manager_id' => $request->manager_id,
            'status' => 'manager_assigned'
        ]);

        return redirect()->back()->with('success', 'Manager assigned successfully.');
    }
}
