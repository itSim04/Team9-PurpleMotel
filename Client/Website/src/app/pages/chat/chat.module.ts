import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatsPageComponent } from './chat.component';


@NgModule({
  declarations: [
    ChatsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule
  ]
})
export class ChatsPageModule {}
