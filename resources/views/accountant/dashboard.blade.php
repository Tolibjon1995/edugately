@extends('layouts.app')

@section('content')
    <div class="card">
        <div class="card-header">Accountant Dashboard - Pending Service Fees</div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>University</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($applications as $app)
                        <tr>
                            <td>{{ $app->user->name }}</td>
                            <td>{{ $app->university->name }}</td>
                            <td><span class="badge bg-warning">{{ $app->status }}</span></td>
                            <td>
                                <form action="{{ route('accountant.approvePayment', $app->id) }}" method="POST">
                                    @csrf
                                    <button type="submit" class="btn btn-success btn-sm">Approve Payment</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4">No pending payments.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
