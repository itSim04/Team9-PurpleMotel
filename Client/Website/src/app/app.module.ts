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
import { AuthenticationModule } from './service/dialogs/authentication/authentication.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { StockDatabaseModule } from './pages/admin/stock-database/stock-database.module';
import { ConfirmationDialogModule } from './service/dialogs/confirmation/confirmation.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    NavBarModule,
    FooterModule,
    BrowserAnimationsModule,

    StarRatingModule.forRoot(),
    AuthenticationModule,

    StockDatabaseModule,
    ConfirmationDialogModule

  ],
  providers: [
    MatDialogModule,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
