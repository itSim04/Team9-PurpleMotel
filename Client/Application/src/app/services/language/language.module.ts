import { LanguageDatabaseService } from '../providers/language-database.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { extractUser } from 'src/app/components/database/database.component';

export function TranslationLoader(http: HttpClient, translate: TranslateService, language_service: LanguageDatabaseService) {

  return () => {
    return new Promise<void>((resolve, reject) => {
      language_service.getTerms(extractUser()?.language || '1').subscribe({
        next:
          translations => {
            translate.setTranslation('en', translations);
            resolve();
          },
        error: error => {
          console.error(`Error loading translations: ${error}`);
          resolve();
        }
      });
    });
  };

  // this.language_service.getTerms().subscribe(data => {

  //   this.translation_service.setTranslation('en', data);

  // });

  // return new TranslateHttpLoader(http,

  //   './assets/i18n/',

  //   '.json');

}

@NgModule({

  declarations: [],

  imports: [

    CommonModule,

    HttpClientModule,

    TranslateModule.forRoot({

      defaultLanguage: 'en',

      // loader: {

      //   provide: TranslateLoader,

      //   // useFactory: HttpLoaderFactory,

      //   deps: [HttpClient],

      // },

    }),

  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: TranslationLoader,
      deps: [HttpClient, TranslateService, LanguageDatabaseService],
      multi: true
    }
  ],

  exports: [TranslateModule],

})

export class LanguageModule { }


export const terms: [string, string][] = [

  ["1", "about_us"],
  ["2", "activities"],
  ["3", "add_cart"],
  ["4", "add_entry"],
  ["5", "add_picture"],
  ["6", "admin_panel"],
  ["7", "adults"],
  ["8", "apply_promo"],
  ["9", "article"],
  ["10", "book"],
  ["11", "booking"],
  ["12", "booking_details"],
  ["13", "cart"],
  ["14", "change_password"],
  ["15", "chefs"],
  ["16", "check_availability"],
  ["17", "choose_date"],
  ["18", "confirm_password"],
  ["19", "connection_error"],
  ["20", "date"],
  ["21", "date_of_birth"],
  ["22", "date_range"],
  ["23", "delete"],
  ["24", "denied"],
  ["25", "description"],
  ["26", "desserts"],
  ["27", "edit_profile"],
  ["28", "email"],
  ["29", "empty_table"],
  ["30", "end_date"],
  ["31", "enter_code"],
  ["32", "facilities"],
  ["33", "facilities_introduction"],
  ["34", "fee"],
  ["35", "feedback"],
  ["36", "female"],
  ["37", "filter"],
  ["38", "filter_by"],
  ["39", "first_name"],
  ["40", "forgot_password"],
  ["41", "found"],
  ["42", "gender"],
  ["43", "have_account"],
  ["44", "home"],
  ["45", "hotel_introduction"],
  ["46", "invalid_code"],
  ["47", "invalid_credentials"],
  ["48", "invalid_email"],
  ["49", "invalid_end_date"],
  ["50", "invalid_old_password"],
  ["51", "invalid_start_date"],
  ["52", "kids"],
  ["53", "label"],
  ["54", "language"],
  ["55", "last_name"],
  ["56", "learn_more"],
  ["57", "likes"],
  ["58", "login"],
  ["59", "logout"],
  ["60", "male"],
  ["61", "mascot"],
  ["62", "menu"],
  ["63", "menu"],
  ["64", "menu_introduction"],
  ["65", "my_activities"],
  ["66", "my_bookings"],
  ["67", "my_orders"],
  ["68", "name1"],
  ["69", "name2"],
  ["70", "news_feed"],
  ["71", "no_account"],
  ["72", "number_input"],
  ["73", "occupancy"],
  ["74", "ok"],
  ["75", "old_password"],
  ["76", "order_overview"],
  ["77", "other"],
  ["78", "password"],
  ["79", "password_match"],
  ["80", "phone_number"],
  ["81", "place_order"],
  ["82", "platters"],
  ["83", "powered_by"],
  ["84", "price"],
  ["85", "published"],
  ["86", "quantity"],
  ["87", "quick_actions"],
  ["88", "rather_not_say"],
  ["89", "register"],
  ["90", "remove_picture"],
  ["91", "reset"],
  ["92", "reset_filter"],
  ["93", "restaurant"],
  ["94", "restaurant_introduction"],
  ["95", "retry_question"],
  ["96", "review"],
  ["97", "room"],
  ["98", "room_introduction"],
  ["99", "room_type"],
  ["100", "rooms"],
  ["101", "rooms_rates"],
  ["102", "salads"],
  ["103", "seats"],
  ["104", "sent_email"],
  ["105", "services"],
  ["106", "services_introduction"],
  ["107", "sign_in"],
  ["108", "sign_up"],
  ["109", "start_date"],
  ["110", "starters"],
  ["111", "stay"],
  ["112", "stock"],
  ["113", "subscribe"],
  ["114", "support"],
  ["115", "team_name"],
  ["116", "terms_conditions"],
  ["117", "testimonials"],
  ["118", "total"],
  ["119", "unique"],
  ["120", "used_credentials"],
  ["121", "user"],
  ["122", "user_type"],
  ["123", "valid_number"],
  ["124", "verification"],
  ["125", "verify"],
  ["126", "view_cart"],
  ["127", "view_details"],
  ["128", "view_menu"],
  ["129", "weak_password"],
  ["130", "website_name"],
  ["131", "welcome_to"]
];

export const information = [

  ["1", "name1"],
  ["2", "name2"],

];