import { ToastController } from '@ionic/angular';
import { BookingDatabaseService } from 'src/app/pages/admin/booking-database/booking-database.service';
import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { formatOccupancy } from 'src/app/pages/admin/room-database/room-database.component';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';
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

  constructor(private booking_service: BookingDatabaseService, private snackBar: ToastController) { }

  get formatOccupancy(): string {

    return formatOccupancy([this.room_type?.value?.adults_capacity, this.room_type?.value?.adults_with_kids_capacity, this.room_type?.value?.kids_capacity]);

  }


  get formatPrice(): string {
    return formatPrice(this.room_type?.value?.price);
  }

  addBooking(range: { check_in: Date, check_out: Date }) {

    const user_id = localStorage.getItem('id');


    if (user_id && this.room?.key) {
      this.booking_service.getAllRoomsBookings(this.room.key).subscribe(conflicts => {


        const conflicting_bookings = []

        for (let booking of conflicts.bookings) {

          if (!(range.check_out < new Date(booking[1].check_in) || range.check_in > new Date(booking[1].end_date))) {

            conflicting_bookings.push(booking[0]);
          }
        }



        if (conflicting_bookings.length) {

          this.display_toast('Conflicting bookings')

        } else {

          this.booking_service.addNewBooking({

            check_in: parseDate(range.check_in),
            end_date: parseDate(range.check_out),
            exhausted: false,
            room_id: this.room!.key,
            user_id: user_id


          }).subscribe();

        }
      });

    } else {

      console.error('Invalid id or room key')

    }
  }

  async display_toast(body: string) {
    
    const toast = await this.snackBar.create({
      message: body,
      duration: 1500,
      position: 'bottom'
    });
  
    await toast.present();

  }

}

