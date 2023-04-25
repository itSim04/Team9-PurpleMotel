import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RoomItemModule } from "src/app/components/room/room-item/room-item.module";
import { LanguageModule } from "src/app/services/language/language.module";
import { BrowseRoomsComponent } from "./browse-rooms/browse-rooms.component";




@NgModule({
  declarations: [
    BrowseRoomsComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RoomItemModule,
    LanguageModule

  ],
  exports: [
    BrowseRoomsComponent,
  ]
})
export class RoomsModule { }
