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

    {{-- Dynamic SEO for Inertia pages --}}
    @php
        $seo = [
            'home' => [
                'title' => 'BFI Education Services - World-Class International Schools in Myanmar',
                'description' =>
                    'BFI Education Services manages 9+ international schools across Myanmar, offering world-class programmes, foreign teachers, IB Diploma pathways, events, and admissions support.',
                'keywords' =>
                    'BFI Education, international schools Myanmar, IB Diploma, foreign teachers, education services',
                'image' => url('/img/bfi.webp'),
            ],
        ];
        $currentSeo = $seo[$page['component']] ?? $seo['home'];
    @endphp

    <title inertia>{{ $currentSeo['title'] }}</title>
    <meta name="description" content="{{ $currentSeo['description'] }}">
    <meta name="keywords" content="{{ $currentSeo['keywords'] }}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="BFI Education Services">

    {{-- Open Graph for Facebook / LinkedIn --}}
    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ $currentSeo['title'] }}">
    <meta property="og:description" content="{{ $currentSeo['description'] }}">
    <meta property="og:image" content="{{ $currentSeo['image'] }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:site_name" content="BFI Education Services">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $currentSeo['title'] }}">
    <meta name="twitter:description" content="{{ $currentSeo['description'] }}">
    <meta name="twitter:image" content="{{ $currentSeo['image'] }}">

    {{-- Favicon --}}
    <link rel="icon" type="image/png" sizes="32x32" href="img/bfi.webp">
    <link rel="icon" type="image/png" sizes="16x16" href="img/bfi.webp">
    <link rel="apple-touch-icon" href="img/bfi.webp">
    <link rel="shortcut icon" href="img/bfi.webp">

    <link rel="preload" href="/assets/fonts/oswald-v57-latin-regular.woff2" as="font" type="font/woff2"
        crossorigin />
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
