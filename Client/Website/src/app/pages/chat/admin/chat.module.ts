import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatsPageComponent } from './chat.component';
import {MatIconModule} from '@angular/material/icon';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    ChatsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavBarModule,
    FormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule
  ]
})
export class ChatsPageModule {}
