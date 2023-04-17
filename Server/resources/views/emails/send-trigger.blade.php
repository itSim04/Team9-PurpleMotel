@component('mail::message')
<h1>Trigger Message</h1>
<p>The transaction happened on the model <b>{{ $model_name }}</b></p>

@component('mail::panel')
{{ $data }}
@endcomponent

<p>The transaction was commited by <b>{{ $email }}</b></p>
@endcomponent