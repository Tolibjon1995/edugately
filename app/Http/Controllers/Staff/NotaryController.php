<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Document;
use App\Services\FileUploadService;

class NotaryController extends Controller
{
    protected $fileUploadService;

    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    public function dashboard()
    {
        $applications = Application::where('status', 'translation_needed')->with('user')->get();
        return view('staff.notary.dashboard', compact('applications'));
    }

    public function uploadTranslation(Request $request)
    {
        $request->validate([
            'application_id' => 'required|exists:applications,id',
            'file' => 'required|file|mimes:pdf|max:5120',
        ]);

        $application = Application::findOrFail($request->application_id);

        try {
            $path = $this->fileUploadService->upload($request->file('file'), 'translations', ['pdf']);

            Document::create([
                'application_id' => $application->id,
                'type' => 'translated_docs',
                'file_path' => $path,
                'original_name' => $request->file('file')->getClientOriginalName(),
            ]);

            $application->update(['status' => 'translated']);

            return redirect()->back()->with('success', 'Translation uploaded.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['file' => $e->getMessage()]);
        }
    }
}
