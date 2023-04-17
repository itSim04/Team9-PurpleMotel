<?php

namespace App\Listeners;

use App\Events\CustomCustomEvent;
use App\Events\CustomEvent;
use App\Mail\ForgotPasswordSend;
use App\Mail\SendCustomTriggerEmail;
use App\Mail\SendTriggerEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendCustomNotifications
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CustomCustomEvent $event): void
    {
        Mail::to('mm@gmail.com')->send(new SendCustomTriggerEmail($event->old_data, $event->new_data, $event->extra, $event->model_name, $event->user->email));
    }
}
