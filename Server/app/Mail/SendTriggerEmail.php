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
    public $changes;

    public function __construct($data, $email)
    {
        $this->data = $data;
        switch ($data->type) {

            case 0:

                break;

            case 1:

                $this->changes = $this->buildUpdateMessage($data->getOriginal(), $data->getChanges());
                break;

            case 2:

                break;
        }
        $this->email = $email;
    }

    public function buildUpdateMessage($old_values, $new_values)
    {

        $changes = [];
        foreach ($old_values as $key => $value) {

            if ($key != 'updated_at' && array_key_exists($key, $new_values)) {

                $changes[] = [ucwords($key), $value, $new_values[$key]];
            }
        }
        return $changes;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.send-trigger', ['model_name' => class_basename($this->data)]);
    }
}
