import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { formatOccupancy } from 'src/app/pages/admin/room-database/room-database.component';
import { formatPrice } from '../../database/database.component';


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent {

  @Input() room?: KeyValue<string, Room>
  @Input() room_type?: KeyValue<string, RoomType>
  @Input() overview = true;

  get formatOccupancy(): string {

    return formatOccupancy([this.room_type?.value?.adults_capacity, this.room_type?.value?.adults_with_kids_capacity, this.room_type?.value?.kids_capacity]);

  }


  get formatPrice(): string {
    return formatPrice(this.room_type?.value?.price);
  }

}

