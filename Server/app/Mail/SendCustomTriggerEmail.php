<?php

namespace App\Mail;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendCustomTriggerEmail extends Mailable
{
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $old_data;
    public $new_data;

    public $type;
    public $email;
    public $changes;

    public $extra;
    public $model_name;

    public function __construct($old_data, $new_data, $extra, $model_name, $email)
    {
        $this->old_data = $old_data;
        $this->new_data = $new_data;
        $this->extra = $extra;
        $this->email = $email;
        $this->model_name = $model_name;
    }

    public function buildAddMessage($new_values)
    {

        $changes = [];
        foreach ($new_values as $value) {

            $changes[] = [$value, $this->new_data->$value];
        }

        return $changes;
    }
    public function buildUpdateMessage($old_values, $new_values)
    {

        $old_array = [];
        foreach ($old_values as $value) {

            $old_array[$value] = $this->old_data->$value;
        }

        $changes = [];

        foreach ($old_array as $key => $value) {

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


        if ($this->old_data) {


            $this->changes = $this->buildUpdateMessage($this->old_data->getFillable(), $this->new_data);
            return $this->markdown('emails.send-custom-update-trigger');
        } else {

            $this->changes = $this->buildAddMessage($this->new_data->getFillable());
            return $this->markdown('emails.send-custom-add-trigger');
        }
    }
}
