import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatListComponent } from './chat-list.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ChatListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  exports:[
    ChatListComponent
  ]
})
export class ChatListModule { }
