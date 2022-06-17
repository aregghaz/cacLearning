<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />

    <meta name="viewport" content="width=device-width, user-scalable=no">
    <meta property="og:url" content="" />
    <meta property="og:type" content="website" />

    <script src="https://polyfill.io/v3/polyfill.min.js?features=Map%2CIntersectionObserver"></script>

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.svg">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.svg">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <link href="/css/swiper.css" rel="stylesheet">
    <link href="{{asset('css/style.css')}}" rel="stylesheet">
    <link href="{{asset('css/react-toastify.css')}}" rel="stylesheet">
    <link href="{{asset('css/main.css')}}" rel="stylesheet">


    <title>LAO</title>

</head>
<body>
    <div id="root"></div>
    <div id="loader-portal"></div>
    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>
