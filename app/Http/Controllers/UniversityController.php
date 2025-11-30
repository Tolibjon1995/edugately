<?php

namespace App\Http\Controllers;

use App\Models\University;
use Illuminate\Http\Request;

class UniversityController extends Controller
{
    public function index()
    {
        $universities = University::all();
        // Mapped to src/containers/web/pages/UnverList
        return view('frontend.universities.index', compact('universities'));
    }

    public function show($id)
    {
        $university = University::findOrFail($id);
        return view('frontend.universities.show', compact('university'));
    }
}
