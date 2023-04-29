import { ImageCachingService } from './services/utility/image-caching.service';
import { GuestChatsPageModule } from './pages/chat/guest/chat.module';
import { InformationDatabaseModule } from './pages/admin/information-database/information-database.module';
import { QuickDialogModule } from './services/dialogs/quick/quick.module';
import { AdminDashboardModule } from './pages/admin/admin-dashboard/admin-dashboard.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeModule } from './pages/guest/home/home.module';;
import { UserDatabaseModule } from './pages/admin/user-database/user-database.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationModule } from './services/dialogs/authentication/authentication.module';
import { FoodDatabaseModule } from './pages/admin/food-database/food-database.module';
import { RoomDatabaseModule } from './pages/admin/room-database/room-database.module';
import { StockDatabaseModule } from './pages/admin/stock-database/stock-database.module';
import { BookingDatabaseModule } from './pages/admin/booking-database/booking-database.module';
import { AnnouncementDatabaseModule } from './pages/admin/announcement-database/announcement-database.module';
import { LanguageDatabaseModule } from './pages/admin/language-database/language-database.module';
import { NewsDatabaseModule } from './pages/admin/news-database/news-database.module';
import { OrderDatabaseModule } from './pages/admin/order-database/order-database.module';
import { PromoDatabaseModule } from './pages/admin/promo-database/promo-database.module';
import { RegistrationDatabaseModule } from './pages/admin/registration-database/registration-database.module';
import { CarouselModule } from './components/general/carousel/carousel.module';
import { ServiceDatabaseModule } from './pages/admin/service-database/service-database.module';
import { ProfileModule } from './pages/guest/profile/profile.module';
import { RestaurantModule } from './pages/guest/restaurant/restaurant.module';
import { RoomsModule } from './pages/guest/rooms/rooms.module';
import { ServicesModule } from './pages/guest/services/services.module';
import { CartDialogModule } from './services/dialogs/cart/cart.module';
import { ConfirmationDialogModule } from './services/dialogs/confirmation/confirmation.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { ChatsPageModule } from './pages/chat/admin/chat.module';
import { ImageDatabaseModule } from './pages/admin/image-database/image-database.module';
import { BrowsingDialogModule } from './services/dialogs/browsing/browsing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    // Utilities
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    StarRatingModule.forRoot(),
    RouterModule,

    // Potential
    ConfirmationDialogModule,
    BrowserAnimationsModule,
    BrowsingDialogModule,

    AnnouncementDatabaseModule,
    BookingDatabaseModule,
    FoodDatabaseModule,
    LanguageDatabaseModule,
    NewsDatabaseModule,
    PromoDatabaseModule,
    OrderDatabaseModule,
    InformationDatabaseModule,


    RegistrationDatabaseModule,
    RoomDatabaseModule,
    ServiceDatabaseModule,
    StockDatabaseModule,
    UserDatabaseModule,
    RegistrationDatabaseModule,

    ImageDatabaseModule,

    AdminDashboardModule,

    // Guest
    HomeModule,
    RestaurantModule,
    ServicesModule,
    RoomsModule,

    AuthenticationModule,
    ProfileModule,

    ChatsPageModule,
    GuestChatsPageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())

  ],
  providers: [
    MatDialogModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ImageCachingService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
