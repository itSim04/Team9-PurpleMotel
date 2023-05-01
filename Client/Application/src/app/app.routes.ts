import { SplashComponent } from './pages/splash/splash.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { ChangePasswordComponent } from 'src/app/pages/guest/profile/change-password/change-password.component';
import { ForgotComponent } from './pages/authentication/forgot/forgot.component';
import { EditProfileComponent } from 'src/app/pages/guest/profile/edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { TabsPage } from './tabs/tabs.page';
import { Routes, CanActivate } from '@angular/router';
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
import { HomeComponent } from './pages/guest/home/home.component';
import { GuestChatComponent } from './chat/guest/chat.component';
import { AdminChatComponent } from './chat/admin/chat/chat.component';
import { AdminGuard } from './guards/admin.guard';
import { GuestGuard } from './guards/guest.guard';
import { AdminChatGuard } from './guards/admin.chat.guard';
import { ChatGuard } from './guards/chat.guard';
import { BrowseRoomsComponent } from './pages/guest/rooms/browse-rooms/browse-rooms.component';
import { RestaurantLandingComponent } from './pages/guest/restaurant/landing/landing-restaurant.component';
import { ProfileComponent } from './pages/guest/profile/profile.component';
import { ChatListComponent } from './chat/chat-list/chat.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MenuComponent } from './pages/guest/restaurant/menu/menu.component';
import { VerifyComponent } from './pages/authentication/verify/verify.component';
import { InformationDatabaseComponent } from './pages/admin/information-database/information-database.component';
import { ImageDatabaseComponent } from './pages/admin/image-database/image-database.component';



export const routes: Routes = [

  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {

    path: 'tutorial',
    component: TutorialComponent

  },
  {

    path: 'splash',
    component: SplashComponent

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
        component: LoginComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'verify',
        component: VerifyComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'change',
        component: ChangePasswordComponent
      },



    ]
  },


  {

    path: '',
    component: TabsPage,
    canActivate: [GuestGuard],
    children: [
      {

        path: 'profile',
        children: [

          {
            path: '',
            component: ProfileComponent

          },
          {
            path: 'edit',
            component: EditProfileComponent
          }

        ]



      },
      {
        path: 'rooms',
        children: [
          {
            path: 'browse',
            component: BrowseRoomsComponent
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
        component: HomeComponent
      },
      {
        path: 'services',
        component: BrowseServicesComponent
      },
      {
        path: 'restaurant',
        children: [

          {

            path: '',
            redirectTo: 'landing',
            pathMatch: 'full'

          },
          {

            path: 'menu',
            component: MenuComponent
          },
          {
            path: 'landing',
            component: RestaurantLandingComponent

          }


        ]
      },
      {
        path: 'chat',
        children: [


          {
            path: 'guest/:id',
            canActivate: [ChatGuard],
            component: GuestChatComponent
          },

          {
            path: "admin",
            canActivate: [AdminChatGuard],
            component: ChatListComponent,
          },
          {
            path: "admin/:id",
            canActivate: [AdminChatGuard],
            component: AdminChatComponent,
          }
        ]
      },
      {
        path: 'settings',
        canActivate: [GuestGuard],
        component: SettingsComponent
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
          {
            path: "informations-database",
            component: InformationDatabaseComponent,
          },
          {
            path: "images-database",
            component: ImageDatabaseComponent,
          },


        ]
      },


    ]
  },
  // {
  //   path: "profile",
  //   canActivate: [GuestGuard],
  //   component: ProfileComponent,
  // },





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

