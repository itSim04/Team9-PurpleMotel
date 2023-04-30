import { LanguageModule } from 'src/app/services/language/language.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from 'src/app/tabs/tabs.page';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LanguageModule,
    IonicModule.forRoot(),
    
  ],
  exports:[
    SettingsComponent
  ]
})
export class SettingsModule { }
