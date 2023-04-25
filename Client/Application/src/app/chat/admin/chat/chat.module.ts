import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminChatComponent } from './chat.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule
  ],
  exports:[
    AdminChatComponent
  ]
})
export class ChatsPageModule {}
