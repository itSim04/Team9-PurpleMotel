<?php

namespace App\Listeners;

use App\Events\CustomEvent;
use App\Mail\ForgotPasswordSend;
use App\Mail\SendTriggerEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendNotifications
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
    public function handle(CustomEvent $event): void
    {
        Mail::to('mm@gmail.com')->send(new SendTriggerEmail($event->data, $event->user->email, $event->type));
    }
}
