import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseRoomsComponent } from './browse/browse-rooms.component';
import { FooterModule } from 'src/app/components/general/footer/footer.module';
import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    BrowseRoomsComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    FooterModule
  ],
  exports: [
    BrowseRoomsComponent
  ]
})
export class RoomsModule { }
