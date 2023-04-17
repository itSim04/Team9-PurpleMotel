<?php

namespace App\Providers;

use App\Events\CustomCreateEvent;
use App\Events\CustomDeleteEvent;
use App\Events\CustomCustomEvent;
use App\Events\CustomUpdateEvent;
use App\Listeners\SendCustomNotifications;
use App\Listeners\SendNotifications;
use App\Mail\SendCustomTriggerEmail;
use App\Mail\SendTriggerEmail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        CustomUpdateEvent::class => [
            SendNotifications::class,
        ],
        CustomCreateEvent::class => [
            SendNotifications::class,
        ],
        CustomDeleteEvent::class => [
            SendNotifications::class,
        ],
        CustomCustomEvent::class => [
            SendCustomNotifications::class,
        ]
        
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
