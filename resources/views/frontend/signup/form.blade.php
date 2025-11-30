@extends('layouts.app')

@section('content')
<h1>Sign Up</h1>
<form method="POST" action="{{ route('signup.submit') }}">
    @csrf
    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="hidden" name="university_id" value="{{ request('university_id') }}">
    <button type="submit">Register</button>
</form>
@endsection
