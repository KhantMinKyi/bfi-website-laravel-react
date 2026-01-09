<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'light') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'light' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'BFI Education Services') }}</title>

    <link rel="icon" href="{{ asset('/icon.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preload" href="/assets/fonts/Oswald-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin />
    @routes
    @env('local')
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @endenv

    @env('production')
        @vite(['resources/js/app.tsx'])
    @endenv
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
