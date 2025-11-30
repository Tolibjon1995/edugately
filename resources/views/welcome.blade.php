<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Study Abroad Agency</title>
    </head>
    <body class="antialiased">
        <h1>Study Abroad Agency</h1>
        <a href="{{ route('universities.index') }}">View Universities</a>
        <br>
        <a href="{{ route('signup.form') }}">Sign Up</a>
    </body>
</html>
