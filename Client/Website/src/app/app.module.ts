import { AdminDashboardModule } from './pages/admin/admin-dashboard/admin-dashboard.module';
import { PromoDatabaseModule } from './pages/admin/promo-database/promo-database.module';
import { ProfileModule } from './pages/guest/profile/profile.module';
import { RoomOverviewModule } from './pages/guest/rooms/overview/room-overview.module';
import { BrowseRoomsModule } from './pages/guest/rooms/browse/browse-rooms.module';
import { BrowseServicesModule } from './pages/guest/services/services.module';
import { MenuModule } from './pages/guest/restaurant/menu/menu.module';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeModule } from './pages/guest/home/home.module';
import { ConfirmationDialogModule } from './services/dialogs/confirmation/confirmation.module';
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
import { ServiceDatabaseModule } from './pages/admin/service-database/service-database.module';

import { AnnouncementDatabaseModule } from './pages/admin/announcement-database/announcement-database.module';
import { LanguageDatabaseModule } from './pages/admin/language-database/language-database.module';
import { NewsDatabaseModule } from './pages/admin/news-database/news-database.module';
import { OrderDatabaseModule } from './pages/admin/order-database/order-database.module';
import { RegistrationDatabaseModule } from './pages/admin/registration-database/registration-database.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
     // Utilities
     BrowserModule,
     AppRoutingModule,
     StarRatingModule.forRoot(),
     RouterModule,
 
     // Potential
     ConfirmationDialogModule,
     BrowserAnimationsModule,
 
     // Admin
     AnnouncementDatabaseModule,
     BookingDatabaseModule,
     FoodDatabaseModule,
     LanguageDatabaseModule,
     NewsDatabaseModule,
     PromoDatabaseModule,
     OrderDatabaseModule,
     RegistrationDatabaseModule,
     RoomDatabaseModule,
     ServiceDatabaseModule,
     StockDatabaseModule,
     UserDatabaseModule,

     AdminDashboardModule,
 
     // Guest
 
     HomeModule,
     MenuModule,
     BrowseServicesModule,
     BrowseRoomsModule,

     RoomOverviewModule,

     ProfileModule,
 
     AuthenticationModule,
     ConfirmationDialogModule,
 

  ],
  providers: [
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
