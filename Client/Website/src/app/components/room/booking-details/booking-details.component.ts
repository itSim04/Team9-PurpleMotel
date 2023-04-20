import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatPrice, Required } from 'src/app/components/database/database.component';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { formatOccupancy } from 'src/app/pages/admin/room-database/room-database.component';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {
  @Input() check_in!: string;
  @Input() end_date!: string;
  @Input() exhausted!: boolean;
  @Input() room?: Room;
  @Input() room_type?: RoomType;

  @Input() @Required booking_id!: string;
  
  @Output() delete = new EventEmitter<string>();
  path = '../../../../assets/room-' + (Math.floor(Math.random() * 6) + 1) + '.png';

  formatPrice(price: number | undefined) {

    return formatPrice(price);

  }

  formatOccupancy(size1?: number, size2?: number, size3?: number) {

    return formatOccupancy([size1, size2, size3]);

  }

  get past() {

    return (new Date() >= new Date(this.check_in));

  }
}
