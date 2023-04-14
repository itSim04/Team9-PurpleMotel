import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { ProfileComponent } from './profile.component';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule,
    LanguageModule
  ]
})
export class ProfileModule { }
