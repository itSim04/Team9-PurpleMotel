import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsPage } from './tabs/tabs.page';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AdminDashboardModule } from './pages/admin/admin-dashboard/admin-dashboard.module';
import { AnnouncementDatabaseModule } from './pages/admin/announcement-database/announcement-database.module';
import { BookingDatabaseModule } from './pages/admin/booking-database/booking-database.module';
import { FoodDatabaseModule } from './pages/admin/food-database/food-database.module';
import { LanguageDatabaseModule } from './pages/admin/language-database/language-database.module';
import { NewsDatabaseModule } from './pages/admin/news-database/news-database.module';
import { OrderDatabaseModule } from './pages/admin/order-database/order-database.module';
import { PromoDatabaseModule } from './pages/admin/promo-database/promo-database.module';
import { RegistrationDatabaseModule } from './pages/admin/registration-database/registration-database.module';
import { RoomDatabaseModule } from './pages/admin/room-database/room-database.module';
import { ServiceDatabaseModule } from './pages/admin/service-database/service-database.module';
import { StockDatabaseModule } from './pages/admin/stock-database/stock-database.module';
import { UserDatabaseModule } from './pages/admin/user-database/user-database.module';
import { ConfirmationDialogModule } from './services/dialogs/confirmation/confirmation.module';
import { ActivitiesModule } from './components/activities/activities.module';
import { ServicesModule } from './pages/guest/services/services.module';
import { HomeModule } from './pages/guest/home/home.module';
import { NewsListItemModule } from './components/news/news-list-item/news-list-item.module';




@NgModule({
  declarations: [
    AppComponent,
    TabsPage
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    BrowserModule,
    AuthenticationModule,
    HttpClientModule,
    IonicModule.forRoot(),

    BrowserAnimationsModule,
    ConfirmationDialogModule,

    // Admin
    AnnouncementDatabaseModule,
    BookingDatabaseModule,
    FoodDatabaseModule,
    LanguageDatabaseModule,
    NewsDatabaseModule,
    OrderDatabaseModule,
    PromoDatabaseModule,
    RegistrationDatabaseModule,
    RoomDatabaseModule,
    ServiceDatabaseModule,
    StockDatabaseModule,
    UserDatabaseModule,
    RegistrationDatabaseModule,
    ActivitiesModule,
    ServicesModule,
    AdminDashboardModule,


    HomeModule,
    NewsListItemModule

  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
