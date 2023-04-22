<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ActivitySeeder::class);
        $this->call(FacilitySeeder::class);
        $this->call(UserSeeder::class);
        $this->call(FoodSeeder::class);
        $this->call(RoomTypeSeeder::class);
        $this->call(RoomSeeder::class);
        $this->call(StocksSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(UserTypeSeeder::class);
        $this->call(BookingSeeder::class);
        $this->call(RegistrationSeeder::class);
        $this->call(FoodCategorySeeder::class);
        $this->call(IngredientSeeder::class);
        $this->call(AnnouncementsSeeder::class);
        $this->call(OrderSeeder::class);
        $this->call(OrderContainsSeeder::class);
        $this->call(NewsSeeder::class);
        $this->call(PromoCodeSeeder::class);
        $this->call(EligibilityPromoCodesSeeder::class);
        $this->call(AppliedPromoCodesSeeder::class);
        $this->call(EffectPromoCodesSeeder::class);
        $this->call(LikesNewsSeeder::class);
        $this->call(ReviewSeeder::class);
        $this->call(ImageSeeder::class);
    }
}
