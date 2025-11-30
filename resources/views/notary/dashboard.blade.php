@extends('layouts.app')

@section('content')
<h1>Notary Dashboard</h1>
@foreach($applications as $app)
    <div>
        <h3>{{ $app->user->name }}</h3>
        <p>Docs to translate...</p>
        <form method="POST" action="{{ route('notary.uploadTranslation', $app->id) }}" enctype="multipart/form-data">
            @csrf
            <input type="file" name="file">
            <button type="submit">Upload Translation</button>
        </form>
    </div>
@endforeach
@endsection
