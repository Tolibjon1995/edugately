@extends('layouts.app')

@section('content')
<h1>Accountant - Payments</h1>

<h2>Service Fee Verifications</h2>
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
        @foreach($serviceApplications as $app)
            <tr>
                <td>{{ $app->user->name }}</td>
                <td>{{ $app->university->name }}</td>
                <td>{{ $app->status }}</td>
                <td>
                    @if($app->status == 'payment_verification')
                    <form method="POST" action="{{ route('accountant.verifyPayment', $app->id) }}">
                        @csrf
                        <button type="submit">Verify Payment</button>
                    </form>
                    @else
                    Approved
                    @endif
                </td>
            </tr>
        @endforeach
    </tbody>
</table>

<h2>Tuition Fee Verifications</h2>
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
        @foreach($tuitionApplications as $app)
            <tr>
                <td>{{ $app->user->name }}</td>
                <td>{{ $app->university->name }}</td>
                <td>{{ $app->status }}</td>
                <td>
                    <form method="POST" action="{{ route('accountant.verifyTuition', $app->id) }}">
                        @csrf
                        <button type="submit">Verify Tuition & Enroll</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
@endsection
