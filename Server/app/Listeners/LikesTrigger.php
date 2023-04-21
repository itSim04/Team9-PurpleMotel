<?php

namespace App\Listeners;

use App\Events\LikesNewsCreated;
use App\Events\LikesNewsDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\LikesNews;
use App\Models\News;

class LikesTrigger
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
    public function handle(LikesNewsCreated | LikesNewsDeleted $event): void
    {
        if($event->creating) {

            News::all()->where('id', $event->news_id)->first()->increment('likes');
        } else {
            
            News::all()->where('id', $event->news_id)->first()->decrement('likes');
        }
    }
}
