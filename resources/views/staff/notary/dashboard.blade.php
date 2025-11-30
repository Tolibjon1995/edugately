@extends('layouts.app')

@section('content')
    <div class="card">
        <div class="card-header">Notary Dashboard - Translations Needed</div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($applications as $app)
                        <tr>
                            <td>{{ $app->user->name }}</td>
                            <td><span class="badge bg-info">{{ $app->status }}</span></td>
                            <td>
                                <form action="{{ route('notary.uploadTranslation') }}" method="POST" enctype="multipart/form-data" class="d-flex gap-2">
                                    @csrf
                                    <input type="hidden" name="application_id" value="{{ $app->id }}">
                                    <input type="file" name="file" class="form-control" required>
                                    <button type="submit" class="btn btn-primary btn-sm">Upload Translation</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3">No translations needed.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
