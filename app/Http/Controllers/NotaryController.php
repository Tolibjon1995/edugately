<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;

class NotaryController extends Controller
{
    public function dashboard()
    {
        // Mapped to src/containers/consultantBackoffice/pages/NotaryBoss.jsx
        // Show applications needing translation
        $applications = Application::where('status', 'in_translation')
            ->with(['user', 'documents'])
            ->get();

        return view('notary.dashboard', compact('applications'));
    }

    public function uploadTranslation(Request $request, $applicationId)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png|max:2048',
        ]);

        $application = Application::findOrFail($applicationId);

        $path = $request->file('file')->store('documents');

        Document::create([
            'application_id' => $application->id,
            'type' => 'translated_docs',
            'file_path' => $path,
            'status' => 'approved',
        ]);

        $application->update(['status' => 'translated']);

        return redirect()->back()->with('success', 'Translation Uploaded');
    }
}
