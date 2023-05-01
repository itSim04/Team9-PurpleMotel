<?php

namespace App\Listeners;

use App\Events\ReviewCreated;
use App\Models\Review;
use App\Models\Room;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ReviewTrigger
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
    public function handle(ReviewCreated $event): void
    {
        $room_id = $event->data->room_id;

        $reviews = Review::all()->where('room_id', $room_id);

        $stars = 0;
        $total = 0;

        foreach ($reviews as $review) {
            $stars += $review->stars;
            $total++;
        }


        Room::find($room_id)->update([
            'rating' => $stars / $total,
        ]);
    }
}
