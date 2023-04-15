import { RegisterComponent } from './services/authentication/register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './services/authentication/login/login.component';

export const routes: Routes = [

  {

    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',

  },
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
  }
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
  //     path: "services",
  //     children: [
  //       {
  //         path: "",
  //         redirectTo: "browse",
  //         pathMatch: "full"
  //       },
  //       {
  //          component: BrowseServicesComponent,
  //         path: "browse"
  //       }
  //     ]
  //   },
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

