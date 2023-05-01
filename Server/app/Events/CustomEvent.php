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

class CustomEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;
    public $user;
    public $type;
    /**
     * Create a new event instance.
     */
    public function __construct($data, $type)
    {
        $this->data = $data;
        $this->type = $type;
        $this->user = Auth::user();
    }
}
