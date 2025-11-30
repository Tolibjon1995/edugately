<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Document;
use App\Services\FileUploadService;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    protected $fileUploadService;

    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    public function dashboard()
    {
        $user = Auth::user();
        $application = Application::where('user_id', $user->id)->with(['university', 'documents'])->latest()->first();

        return view('student.dashboard', compact('application'));
    }

    public function uploadReceipt(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        $user = Auth::user();
        $application = Application::where('user_id', $user->id)->latest()->firstOrFail();

        try {
            $path = $this->fileUploadService->upload($request->file('file'), 'receipts');

            Document::create([
                'application_id' => $application->id,
                'type' => 'service_receipt',
                'file_path' => $path,
                'original_name' => $request->file('file')->getClientOriginalName(),
            ]);

            $application->update(['status' => 'service_fee_pending']);

            return redirect()->back()->with('success', 'Receipt uploaded successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['file' => $e->getMessage()]);
        }
    }
}
