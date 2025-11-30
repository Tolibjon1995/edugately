@extends('layouts.app')

@section('content')
<h1>Student Dashboard</h1>
@if($application)
    <p>Application Status: {{ $application->status }}</p>
    <a href="{{ route('student.timeline') }}">View Timeline</a>
@else
    <p>No application found.</p>
@endif
@endsection
