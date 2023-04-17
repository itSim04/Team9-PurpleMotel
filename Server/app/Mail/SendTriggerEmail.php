<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendTriggerEmail extends Mailable
{
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $data;
    public $email;

    public function __construct($data, $email)
    {
        $this->data = $data;
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.send-trigger', ['code' => $this->data, 'email' => $this->email, 'model_name' => class_basename($this->data)]);
    }
}
