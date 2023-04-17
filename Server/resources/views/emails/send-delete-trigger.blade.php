@component('mail::message')
<h1>Delete Trigger Message</h1>
<p>The transaction happened on the model <b>{{ $model_name }}</b></p>
<p>The following entry was deleted</p>

@component('mail::panel')
@foreach ($changes as $item)
    <p>{{ $item[0] }}: <b>{{ $item[1] }}</b></p>
@endforeach
@endcomponent

<p>The transaction was commited by <b>{{ $email }}</b></p>
@endcomponent