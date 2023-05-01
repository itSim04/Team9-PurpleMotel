import { LanguageModule } from 'src/app/services/language/language.module';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { provideFirebaseApp } from "@angular/fire/app";
import { provideDatabase } from "@angular/fire/database";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { ActivitiesModule } from "./components/activities/activities.module";
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
import { AuthenticationModule } from "./pages/authentication/authentication.module";
import { HomeModule } from "./pages/guest/home/home.module";
import { ServicesModule } from "./pages/guest/services/services.module";
import { TabsPage } from "./tabs/tabs.page";
import { RoomsModule } from "./pages/guest/rooms/rooms.module";
import { RestaurantModule } from "./pages/guest/restaurant/restaurant.module";
import { ProfileModule } from "./pages/guest/profile/profile.module";
import { GuestChatsPageModule } from './chat/guest/chat.module';
import { AdminChatsPageModule } from './chat/admin/chat/chat.module';
import { ChatListModule } from './chat/chat-list/chat.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SettingsModule } from './pages/settings/settings.module';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { InformationDatabaseModule } from './pages/admin/information-database/information-database.module';
import { ImageDatabaseModule } from './pages/admin/image-database/image-database.module';





@NgModule({
  declarations: [
    AppComponent,
    TabsPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    BrowserModule,
    AuthenticationModule,
    
    IonicModule.forRoot(),

    LanguageModule,
    BrowserAnimationsModule,

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
    InformationDatabaseModule,
    ImageDatabaseModule,
    RoomsModule,
   
    MatDatepickerModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideMessaging(() => getMessaging()),

    GuestChatsPageModule,
    AdminChatsPageModule,
    ChatListModule,

    HomeModule,
    ProfileModule,
    RestaurantModule,
    SettingsModule,

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
export class AppModule { 

}
