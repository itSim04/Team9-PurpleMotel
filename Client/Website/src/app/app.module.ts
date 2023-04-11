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
import { ServiceDatabaseModule } from './pages/admin/service-database/service-database.module';
import { BrowseRoomsModule } from './pages/guest/rooms/browse/browse-rooms.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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

    UserDatabaseModule,
    FoodDatabaseModule,

    BookingDatabaseModule,

    StarRatingModule.forRoot(),
    AuthenticationModule,
    RoomDatabaseModule,
    StockDatabaseModule,
    ConfirmationDialogModule,
    ServiceDatabaseModule,
    BrowseRoomsModule

  ],
  providers: [
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
