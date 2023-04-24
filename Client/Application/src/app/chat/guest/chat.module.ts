import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GuestChatComponent } from './chat.component';


@NgModule({
  declarations: [
    GuestChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  exports:[
    GuestChatComponent
  ]
})
export class ChatsPageModule {}
