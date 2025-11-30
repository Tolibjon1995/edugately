<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        $application = $user->applications()->latest()->first();

        return view('student.dashboard', compact('application'));
    }

    public function timeline()
    {
        // Mapped to src/containers/StudentCabinet/pages/status.jsx
        $user = auth()->user();
        $application = $user->applications()->latest()->first();

        return view('student.timeline', compact('application'));
    }

    public function uploadReceipt(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png|max:2048',
        ]);

        $user = auth()->user();
        $application = $user->applications()->latest()->first();

        $path = $request->file('file')->store('receipts');

        Document::create([
            'application_id' => $application->id,
            'type' => 'check_service',
            'file_path' => $path,
            'status' => 'pending',
        ]);

        $application->update(['status' => 'payment_verification']);

        return redirect()->back()->with('success', 'Receipt Uploaded');
    }

    public function uploadTuitionReceipt(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png|max:2048',
        ]);

        $user = auth()->user();
        $application = $user->applications()->latest()->first();

        $path = $request->file('file')->store('receipts');

        Document::create([
            'application_id' => $application->id,
            'type' => 'check_tuition',
            'file_path' => $path,
            'status' => 'pending',
        ]);

        $application->update(['status' => 'tuition_verification']);

        return redirect()->back()->with('success', 'Tuition Receipt Uploaded');
    }
}
