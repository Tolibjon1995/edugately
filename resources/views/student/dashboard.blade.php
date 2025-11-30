@extends('layouts.app')

@section('content')
    <div class="card">
        <div class="card-header">Student Dashboard</div>
        <div class="card-body">
            @if($application)
                <h3>Application to: {{ $application->university->name }}</h3>
                <p>Status: <span class="badge bg-primary">{{ $application->status }}</span></p>

                @if($application->status === 'pending')
                    <div class="alert alert-warning">Please upload your Service Fee Receipt.</div>
                    <form action="{{ route('student.uploadReceipt') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <label for="file" class="form-label">Service Fee Receipt</label>
                            <input type="file" class="form-control" name="file" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Upload Receipt</button>
                    </form>
                @elseif($application->status === 'service_fee_pending')
                    <div class="alert alert-info">Verification pending...</div>
                @else
                    <div class="alert alert-success">Application is in progress.</div>
                @endif
            @else
                <p>No active application. Please register.</p>
            @endif
        </div>
    </div>
@endsection
