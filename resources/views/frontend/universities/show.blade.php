@extends('layouts.app')

@section('content')
<h1>{{ $university->name }}</h1>
<p>{{ $university->description }}</p>
<a href="{{ route('signup.form', ['university_id' => $university->id]) }}">Apply Now</a>
@endsection
