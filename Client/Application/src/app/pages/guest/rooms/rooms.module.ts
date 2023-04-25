import { RoomItemModule } from './../../../components/room/room-item/room-item.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'src/app/services/language/language.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RoomItemModule,
    LanguageModule
  ]
})
export class RoomsModule { }
