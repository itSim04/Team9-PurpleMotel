import { PromoCode } from './../../../models/PromoCode';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { Router } from '@angular/router';
import { extractUserId } from 'src/app/components/database/database.component';
import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { formatOccupancy } from 'src/app/pages/admin/room-database/room-database.component';
import { formatPrice } from '../../database/database.component';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingDatabaseService } from 'src/app/services/providers/booking-database.service';


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent {

  @Input() room?: KeyValue<string, Room>;
  @Input() room_type?: KeyValue<string, RoomType>;
  @Input() overview = true;
  @Input() promo?: KeyValue<string, PromoCode>;

  constructor (private booking_service: BookingDatabaseService, private snackBar: MatSnackBar, private router: Router, private authentication: AuthenticationDialogService) { }

  get formatOccupancy(): string {

    return formatOccupancy([this.room_type?.value?.adults_capacity, this.room_type?.value?.adults_with_kids_capacity, this.room_type?.value?.kids_capacity]);

  }


  get formatPrice(): string {
    return formatPrice(this.room_type?.value?.price, false, false);
  }
  get formatNewPrice(): string | undefined {

    if (this.room_type) {

      return Math.round(this.room_type.value.price * ((this.promo?.value.change || 0) / 100)).toString();

    } else {

      return '';

    }
  }

  addBooking(range: { check_in: Date, check_out: Date; }) {

    const user_id = extractUserId();


    if (user_id) {


      if (this.room?.key) {
        this.booking_service.getAllRoomsBookings(this.room.key).subscribe(conflicts => {


          const conflicting_bookings = [];

          for (let booking of conflicts.bookings) {

            if (!(range.check_out < new Date(booking[1].check_in) || range.check_in > new Date(booking[1].end_date))) {

              conflicting_bookings.push(booking[0]);
            }
          }



          if (conflicting_bookings.length) {

            this.snackBar.open('Conflicting bookings');

          } else {

            this.booking_service.addNewBooking({

              check_in: parseDate(range.check_in),
              end_date: parseDate(range.check_out),
              promo_id: this.promo?.key || '0',
              exhausted: false,
              room_id: this.room!.key,
              user_id: user_id

            }).subscribe(data => {

              this.router.navigate(['profile']);

            });

          }
        });

      } else {

        console.error('Invalid id or room key');

      }
    } else {

      this.authentication.openDialog('login');

    }
  }
}

