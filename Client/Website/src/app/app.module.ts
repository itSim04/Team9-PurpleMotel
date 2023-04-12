import { ConfirmationDialogModule } from './services/dialogs/confirmation/confirmation.module';
import { UserDatabaseModule } from './pages/admin/user-database/user-database.module';
import { UserDatabaseComponent } from './pages/admin/user-database/user-database.component';
import { FooterModule } from './components/general/footer/footer.module';
import { NavBarModule } from './components/general/nav-bar/nav-bar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationModule } from './services/dialogs/authentication/authentication.module';
import { FoodDatabaseModule } from './pages/admin/food-database/food-database.module';
import { RoomDatabaseModule } from './pages/admin/room-database/room-database.module';
import { StockDatabaseModule } from './pages/admin/stock-database/stock-database.module';
import { BookingDatabaseModule } from './pages/admin/booking-database/booking-database.module';
import { AdminDashboardModule } from './pages/admin/admin-dashboard/admin-dashboard.module';
import { ServiceDatabaseModule } from './pages/admin/service-database/service-database.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewsDatabaseModule } from './pages/admin/news-database/news-database.module';
import { PromoDatabaseModule } from './pages/admin/promo-database/promo-database.module';
import { AnnouncementDatabaseModule } from './pages/admin/announcement-database/announcement-database.module';
import { LanguageDatabaseModule } from './pages/admin/language-database/language-database.module';
import { NewsDatabaseModule } from './pages/admin/news-database/news-database.module';
import { OrderDatabaseModule } from './pages/admin/order-database/order-database.module';
import { RegistrationDatabaseModule } from './pages/admin/registration-database/registration-database.module';


@NgModule({
  declarations: [
    AppComponent, 
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
    PromoDatabaseModule,
    StarRatingModule.forRoot(),
    AuthenticationModule,
    RoomDatabaseModule,
    StockDatabaseModule,
    ConfirmationDialogModule,
    ServiceDatabaseModule,

    NewsDatabaseModule

    BookingDatabaseModule
    ServiceDatabaseModule,

    AnnouncementDatabaseModule,
    LanguageDatabaseModule,
    NewsDatabaseModule,
    OrderDatabaseModule,
    RegistrationDatabaseModule

  ],
  providers: [
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
