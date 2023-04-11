import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { formatPrice } from '../../database/database.component';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent {

  @Input() room?: KeyValue<number, Room>;
  @Input() room_type?: KeyValue<number, RoomType>;

  get formatPrice(): string {

    return formatPrice(this.room_type?.value.price);

  }
}
