@extends('layouts.app')

@section('content')
<h1>Universities</h1>
<ul>
    @foreach($universities as $university)
        <li>
            <a href="{{ route('universities.show', $university->id) }}">{{ $university->name }}</a>
        </li>
    @endforeach
</ul>
@endsection
