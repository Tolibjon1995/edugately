@extends('layouts.app')

@section('content')
<h1>Student Detail: {{ $application->user->name }}</h1>
<p>Status: {{ $application->status }}</p>

@if(auth()->user()->hasRole('super_manager'))
    <form method="POST" action="{{ route('manager.assignManager') }}">
        @csrf
        <input type="hidden" name="application_id" value="{{ $application->id }}">
        <!-- Select Manager logic here -->
        <input type="text" name="manager_id" placeholder="Manager ID">
        <button type="submit">Assign Manager</button>
    </form>
@endif

<form method="POST" action="{{ route('manager.sendToNotary') }}">
    @csrf
    <input type="hidden" name="application_id" value="{{ $application->id }}">
    <button type="submit">Send to Notary</button>
</form>

<form method="POST" action="{{ route('manager.submitToUniversity') }}">
    @csrf
    <input type="hidden" name="application_id" value="{{ $application->id }}">
    <button type="submit">Submit to University</button>
</form>

<form method="POST" action="{{ route('manager.uploadContract') }}" enctype="multipart/form-data">
    @csrf
    <input type="hidden" name="application_id" value="{{ $application->id }}">
    <label>Upload Contract (received from University)</label>
    <input type="file" name="file">
    <button type="submit">Upload Contract</button>
</form>
@endsection
