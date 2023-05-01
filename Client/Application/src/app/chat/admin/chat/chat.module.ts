import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminChatComponent } from './chat.component';
import { IonicModule } from '@ionic/angular';
import { LanguageModule } from 'src/app/services/language/language.module';


@NgModule({
  declarations: [
    AdminChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule.forRoot(),
    LanguageModule
  ],
  exports:[
    AdminChatComponent
  ]
})
export class AdminChatsPageModule {}
