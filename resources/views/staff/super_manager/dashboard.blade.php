@extends('layouts.app')

@section('content')
    <div class="card">
        <div class="card-header">Super Manager Dashboard - Assign Managers</div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>University</th>
                        <th>Status</th>
                        <th>Assign Manager</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($applications as $app)
                        <tr>
                            <td>{{ $app->user->name }}</td>
                            <td>{{ $app->university->name }}</td>
                            <td><span class="badge bg-success">{{ $app->status }}</span></td>
                            <td>
                                <form action="{{ route('super_manager.assignManager') }}" method="POST" class="d-flex gap-2">
                                    @csrf
                                    <input type="hidden" name="application_id" value="{{ $app->id }}">
                                    <select name="manager_id" class="form-select form-select-sm" required>
                                        <option value="">Select Manager...</option>
                                        @foreach($managers as $manager)
                                            <option value="{{ $manager->id }}">{{ $manager->name }}</option>
                                        @endforeach
                                    </select>
                                    <button type="submit" class="btn btn-primary btn-sm">Assign</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4">No applications pending manager assignment.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
