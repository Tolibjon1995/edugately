<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Study Abroad</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <!-- Add auth links etc -->
    </nav>

    <div class="container">
        @if(session('success'))
            <div style="color: green">{{ session('success') }}</div>
        @endif
        @yield('content')
    </div>
</body>
</html>
