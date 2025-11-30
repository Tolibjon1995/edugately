<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ManagerController extends Controller
{
    public function studentsList()
    {
        // Mapped to src/containers/consultantBackoffice/pages/Talabalar.jsx
        $user = auth()->user();

        if ($user->hasRole('super_manager')) {
            $applications = Application::with(['user', 'university'])->get();
        } else {
            // Regular manager sees only assigned students
            $applications = Application::where('manager_id', $user->id)
                ->with(['user', 'university'])
                ->get();
        }

        return view('manager.students.index', compact('applications'));
    }

    public function studentDetail($id)
    {
        $application = Application::with(['user', 'university', 'documents'])->findOrFail($id);
        return view('manager.students.show', compact('application'));
    }

    public function assignManager(Request $request)
    {
        $application = Application::findOrFail($request->application_id);
        $application->update([
            'manager_id' => $request->manager_id,
            'status' => 'manager_assigned',
        ]);

        return redirect()->back()->with('success', 'Manager Assigned');
    }

    public function sendToNotary(Request $request)
    {
        $application = Application::findOrFail($request->application_id);
        $application->update(['status' => 'in_translation']);

        return redirect()->back()->with('success', 'Sent to Notary');
    }

    public function submitToUniversity(Request $request)
    {
        $application = Application::findOrFail($request->application_id);
        $application->update(['status' => 'submitted_to_uni']);

        return redirect()->back()->with('success', 'Submitted to University');
    }

    public function uploadContract(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png|max:2048',
        ]);

        $application = Application::findOrFail($request->application_id);

        $path = $request->file('file')->store('documents');

        \App\Models\Document::create([
            'application_id' => $application->id,
            'type' => 'contract',
            'file_path' => $path,
            'status' => 'approved',
        ]);

        $application->update(['status' => 'contract_received']);

        return redirect()->back()->with('success', 'Contract Uploaded');
    }
}
