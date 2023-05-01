<?php

namespace App\Events;

use Illuminate\Foundation\Events\Event;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class CustomCustomEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $old_data;
    public $new_data;
    public $user;
    public $type;
    public $extra;
    public $model_name;

    /**
     * Create a new event instance.
     */
    public function __construct($old_data, $new_data, $extra, $model_name, $type)
    {
        $this->old_data = $old_data;
        $this->new_data = $new_data;
        $this->extra = $extra;
        $this->model_name = $model_name;
        $this->type = $type;
        $this->user = Auth::user();
    }
}
