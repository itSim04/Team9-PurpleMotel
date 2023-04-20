import { HomePage } from './pages/guest/home/home.page';
import { TabsPage } from './tabs/tabs.page';
import { BrowseRoomsPage } from './pages/guest/rooms/browse-rooms/browse-rooms.page';

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AnnouncementDatabaseComponent } from './pages/admin/announcement-database/announcement-database.component';
import { BookingDatabaseComponent } from './pages/admin/booking-database/booking-database.component';
import { FoodDatabaseComponent } from './pages/admin/food-database/food-database.component';
import { LanguageDatabaseComponent } from './pages/admin/language-database/language-database.component';
import { NewsDatabaseComponent } from './pages/admin/news-database/news-database.component';
import { OrderDatabaseComponent } from './pages/admin/order-database/order-database.component';
import { PromoDatabaseComponent } from './pages/admin/promo-database/promo-database.component';
import { RegistrationDatabaseComponent } from './pages/admin/registration-database/registration-database.component';
import { RoomDatabaseComponent } from './pages/admin/room-database/room-database.component';
import { ServiceDatabaseComponent } from './pages/admin/service-database/service-database.component';
import { StockDatabaseComponent } from './pages/admin/stock-database/stock-database.component';
import { UserDatabaseComponent } from './pages/admin/user-database/user-database.component';
import { BrowseServicesComponent } from './pages/guest/services/browse/browse-services.component';


export const routes: Routes = [


  {

    path: 'auth',
    children: [

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent

      },
      {
        path: 'register',
        component: RegisterComponent
      }


    ]
  },


  //{

    //path: '',
    //component: TabsPage,
    //children: [
      {
        path: 'rooms',
        children: [
          {
            path: 'browse',
            component: BrowseRoomsPage
          },
          {
            path: '',
            redirectTo: 'browse',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'services',
        component: BrowseServicesComponent
      },
      {
        path: 'restaurant',
        component: HomePage
      },
//    ]
  //},

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
 


  //   {
  //     path: "",
  //     redirectTo: "home",
  //     pathMatch: 'full'
  //   },
  //   {
  //     path: 'admin',
  //     children: [
  //       {

  //         path: "",
  //          component: AdminDashboardComponent,

  //       },
  //       {
  //         path: "announcement-database",
  //          component: AnnouncementDatabaseComponent,
  //       },
  //       {
  //         path: "booking-database",
  //          component: BookingDatabaseComponent,
  //       },
  //       {
  //         path: "food-database",
  //          component: FoodDatabaseComponent,
  //       },
  //       {
  //         path: "language-database",
  //          component: LanguageDatabaseComponent,
  //       },
  //       {
  //         path: "news-database",
  //          component: NewsDatabaseComponent,
  //       },
  //       {
  //         path: "order-database",
  //          component: OrderDatabaseComponent,
  //       },
  //       {
  //         path: "promo-database",
  //          component: PromoDatabaseComponent,
  //       },
  //       {
  //         path: "registration-database",
  //          component: RegistrationDatabaseComponent,
  //       },
  //       {
  //         path: "room-database",
  //          component: RoomDatabaseComponent
  //       },
  //       {
  //         path: "stock-database",
  //          component: StockDatabaseComponent,

  //       },
  //       {
  //         path: "user-database",
  //          component: UserDatabaseComponent,
  //       },
  //       {
  //         path: "service-database",
  //          component: ServiceDatabaseComponent,
  //       },

  //     ]
  //   },
  //   {
  //     path: "rooms",
  //     children: [
  //       {
  //         path: "",
  //         redirectTo: "browse",
  //         pathMatch: "full"
  //       },
  //       {
  //          component: BrowseRoomsComponent,
  //         path: "browse"
  //       },
  //     ]
  //   },
  //   {
      
  //   {
  //     path: "restaurant",
  //     children: [
  //       {
  //         path: "",
  //         redirectTo: "browse",
  //         pathMatch: "full"
  //       },
  //       {
  //          component: MenuComponent,
  //         path: "menu"
  //       },
  //       {
  //          component: RestaurantLandingComponent,
  //         path: "browse"
  //       }
  //     ]
  //   },
  //   {
  //     path: "home",
  //      component: HomeComponent
  //   }



];

