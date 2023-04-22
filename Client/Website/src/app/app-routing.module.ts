import { InformationDatabaseComponent } from './pages/admin/information-database/information-database.component';
import { GuestGuard } from './guards/guest.guard';
import { AdminGuard } from './guards/admin.guard';
import { RestaurantLandingComponent } from './pages/guest/restaurant/landing/landing-restaurant.component';
import { HomeComponent } from './pages/guest/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { MenuComponent } from './pages/guest/restaurant/menu/menu.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ServiceDatabaseComponent } from './pages/admin/service-database/service-database.component';
import { RoomOverviewComponent } from './pages/guest/rooms/overview/room-overview.component';
import { ProfileComponent } from './pages/guest/profile/profile.component';
import { ActivityOverviewComponent } from './components/activities/activity-overview/activity-overview.component';
import { PromoDatabaseComponent } from './pages/admin/promo-database/promo-database.component';
import { BrowseServicesComponent } from './pages/guest/services/browse/browse-services.component';

const routes: Routes = [

  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
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
        path: "information-database",
        component: InformationDatabaseComponent,
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
      }

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
      {
        component: RoomOverviewComponent,
        path: "details/:id"
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
      },
      {
        component: ActivityOverviewComponent,
        path: "details/:id"
      },
    ]
  },
  {
    path: "restaurant",
    children: [
      {
        path: "",
        redirectTo: "browse",
        pathMatch: "full"
      },
      {
        component: MenuComponent,
        path: "menu"
      },
      {
        component: RestaurantLandingComponent,
        path: "browse"
      }
    ]
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "profile",
    canActivate: [GuestGuard],
    component: ProfileComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
