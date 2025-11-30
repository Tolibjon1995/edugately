@extends('layouts.app')

@section('content')
<h1>Timeline</h1>
<p>Current Status: {{ $application->status }}</p>

@if($application->status == 'pending')
    <form method="POST" action="{{ route('student.uploadReceipt') }}" enctype="multipart/form-data">
        @csrf
        <label>Upload Service Fee Receipt</label>
        <input type="file" name="file">
        <button type="submit">Upload</button>
    </form>
@endif

@if($application->status == 'contract_received')
    <form method="POST" action="{{ route('student.uploadTuition') }}" enctype="multipart/form-data">
        @csrf
        <label>Upload Tuition Receipt</label>
        <input type="file" name="file">
        <button type="submit">Upload</button>
    </form>
@endif

@endsection
