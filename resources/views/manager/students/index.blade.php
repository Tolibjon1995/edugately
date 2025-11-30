@extends('layouts.app')

@section('content')
<h1>Manager - Students</h1>
<table>
    <thead>
        <tr>
            <th>Student</th>
            <th>University</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        @foreach($applications as $app)
            <tr>
                <td>{{ $app->user->name }}</td>
                <td>{{ $app->university->name }}</td>
                <td>{{ $app->status }}</td>
                <td>
                    <a href="{{ route('manager.student.detail', $app->id) }}">View</a>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
@endsection
