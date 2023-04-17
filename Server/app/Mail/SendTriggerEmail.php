<?php

namespace App\Mail;

use Exception;
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

    public $type;
    public $email;
    public $changes;

    public $extra;
    public $model_name;

    public function __construct($data, $email, $type)
    {
        $this->data = $data;
        $this->type = $type;
        $this->email = $email;
        $this->model_name = class_basename($data);
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
    public function buildDeleteMessage($data)
    {

        $changes = [];
        foreach ($data as $key => $value) {

            if ($key != 'updated_at' && $key != 'created_at') {

                $changes[] = [ucwords($key), $value];
            }
        }
        return $changes;
    }

    public function buildAddMessage($data)
    {

        $changes = [];
        foreach ($data as $value) {

            $changes[] = [ucwords($value), $this->data->$value];
        }
        return $changes;
    }
    public function buildCustomMessage($old_values, $new_values)
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
        switch ($this->type) {

            case 0:

                $this->changes = $this->buildAddMessage($this->data->getFillable());
                return $this->markdown('emails.send-create-trigger');

            case 1:

                $this->changes = $this->buildUpdateMessage($this->data->getOriginal(), $this->data->getChanges());
                return $this->markdown('emails.send-update-trigger', ['id' => $this->data->id]);


            case 2:

                $this->changes = $this->buildDeleteMessage($this->data->getOriginal());
                return $this->markdown('emails.send-delete-trigger');


            default:

                throw new Exception("Invalid type");
        }
    }
}
