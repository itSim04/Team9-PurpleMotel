import { PromoCode } from './../../../models/PromoCode';
import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { formatPrice } from '../../database/database.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent {

  @Input() room?: KeyValue<string, Room>;
  @Input() room_type?: KeyValue<string, RoomType>;
  @Input() promo?: KeyValue<string, PromoCode>;

  path = '../../../../assets/room-' + Math.floor(Math.random() * 6 + 1) + '.png';

  


  constructor (private router: Router) { }

  get formatPrice(): string {

    return formatPrice(this.room_type?.value.price, false, false);

  }
  get formatNewPrice(): string | undefined {

    if (this.room_type) {

      return Math.round(this.room_type.value.price * ((this.promo?.value?.change || 0) / 100)).toString();

    } else {

      return '';

    }
  }

  route() {

    if (this.room) {

      localStorage.setItem('temp_room_item', JSON.stringify(this.room));
      localStorage.setItem('temp_room_type_item', JSON.stringify(this.room_type));
      localStorage.setItem('temp_room_promo', JSON.stringify(this.promo))

      this.router.navigate([`/rooms/details/${this.room.key}`]);

    }

  }
}
