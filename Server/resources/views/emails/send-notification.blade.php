@component('mail::message')
<h1>{{ $title }}</h1>

@component('mail::panel')
{{ $body }}
@endcomponent

@endcomponent