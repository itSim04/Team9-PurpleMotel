import { MenuComponent } from './pages/guest/restaurant/menu/menu.component';
import { HomeComponent } from './pages/guest/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementDatabaseComponent } from './pages/admin/announcement-database/announcement-database.component';
import { BookingDatabaseComponent } from './pages/admin/booking-database/booking-database.component';
import { FoodDatabaseComponent } from './pages/admin/food-database/food-database.component';
import { LanguageDatabaseComponent } from './pages/admin/language-database/language-database.component';
import { NewsDatabaseComponent } from './pages/admin/news-database/news-database.component';
import { OrderDatabaseComponent } from './pages/admin/order-database/order-database.component';
import { RegistrationDatabaseComponent } from './pages/admin/registration-database/registration-database.component';
import { RoomDatabaseComponent } from './pages/admin/room-database/room-database.component';
import { StockDatabaseComponent } from './pages/admin/stock-database/stock-database.component';
import { UserDatabaseComponent } from './pages/admin/user-database/user-database.component';
import { BrowseRoomsComponent } from './pages/guest/rooms/browse/browse-rooms.component';
import { BrowseServicesComponent } from './pages/guest/services/services.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ServiceDatabaseComponent } from './pages/admin/service-database/service-database.component';
import { PromoDatabaseComponent } from './pages/admin/promo-database/promo-database.component';

const routes: Routes = [

  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: [
      {

        path: "",
        component: AdminDashboardComponent,

      },
      {
        path: "announcement-database",
        component: AnnouncementDatabaseComponent,
      },
      {
        path: "booking-database",
        component: BookingDatabaseComponent,
      },
      {
        path: "food-database",
        component: FoodDatabaseComponent,
      },
      {
        path: "language-database",
        component: LanguageDatabaseComponent,
      },
      {
        path: "news-database",
        component: NewsDatabaseComponent,
      },
      {
        path: "order-database",
        component: OrderDatabaseComponent,
      },
      {
        path: "promo-database",
        component: PromoDatabaseComponent,
      },
      {
        path: "registration-database",
        component: RegistrationDatabaseComponent,
      },
      {
        path: "room-database",
        component: RoomDatabaseComponent
      },
      {
        path: "stock-database",
        component: StockDatabaseComponent,

      },
      {
        path: "user-database",
        component: UserDatabaseComponent,
      },
      {
        path: "service-database",
        component: ServiceDatabaseComponent,
      },

    ]
  },
  {
    path: "rooms",
    children: [
      {
        path: "",
        redirectTo: "browse",
        pathMatch: "full"
      },
      {
        component: BrowseRoomsComponent,
        path: "browse"
      },
    ]
  },
  {
    path: "services",
    children: [
      {
        path: "",
        redirectTo: "browse",
        pathMatch: "full"
      },
      {
        component: BrowseServicesComponent,
        path: "browse"
      }
    ]
  },
  {
    path: "restaurant",
    children: [
      {
        path: "",
        redirectTo: "menu",
        pathMatch: "full"
      },
      {
        component: MenuComponent,
        path: "menu"
      }
    ]
  },
  {
    path: "home",
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
