import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { StarRatingModule } from "angular-star-rating";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterModule } from "./components/general/footer/footer.module";
import { NavBarModule } from "./components/general/nav-bar/nav-bar.module";
import { AdminDashboardModule } from "./pages/admin/admin-dashboard/admin-dashboard.module";
import { AnnouncementDatabaseModule } from "./pages/admin/announcement-database/announcement-database.module";
import { BookingDatabaseModule } from "./pages/admin/booking-database/booking-database.module";
import { FoodDatabaseModule } from "./pages/admin/food-database/food-database.module";
import { LanguageDatabaseModule } from "./pages/admin/language-database/language-database.module";
import { NewsDatabaseModule } from "./pages/admin/news-database/news-database.module";
import { OrderDatabaseModule } from "./pages/admin/order-database/order-database.module";
import { PromoDatabaseModule } from "./pages/admin/promo-database/promo-database.module";
import { RegistrationDatabaseModule } from "./pages/admin/registration-database/registration-database.module";
import { RoomDatabaseModule } from "./pages/admin/room-database/room-database.module";
import { ServiceDatabaseModule } from "./pages/admin/service-database/service-database.module";
import { StockDatabaseModule } from "./pages/admin/stock-database/stock-database.module";
import { UserDatabaseModule } from "./pages/admin/user-database/user-database.module";
import { AuthenticationModule } from "./services/dialogs/authentication/authentication.module";
import { ConfirmationDialogModule } from "./services/dialogs/confirmation/confirmation.module";
import { ProfileModule } from './pages/guest/profile/profile.module';
import { RestaurantModule } from './pages/guest/restaurant/restaurant.module';
import { HomeModule } from './pages/guest/home/home.module';
import { RoomsModule } from './pages/guest/rooms/rooms.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ConfirmationDialogModule,

    NavBarModule,
    FooterModule,
    BrowserAnimationsModule,

    AdminDashboardModule,
    UserDatabaseModule,
    FoodDatabaseModule,

    BookingDatabaseModule,
    OrderDatabaseModule,

    ProfileModule,
    PromoDatabaseModule,
    StarRatingModule.forRoot(),
    AuthenticationModule,
    RoomDatabaseModule,
    StockDatabaseModule,
    ConfirmationDialogModule,

    AnnouncementDatabaseModule,
    ServiceDatabaseModule,

    NewsDatabaseModule,

    BookingDatabaseModule,
    ServiceDatabaseModule,

    AnnouncementDatabaseModule,
    LanguageDatabaseModule,
    NewsDatabaseModule,
    OrderDatabaseModule,
    RegistrationDatabaseModule,
    RestaurantModule,
    HomeModule,
    RoomsModule

  ],
  providers: [
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
