import { Booking } from 'src/app/models/Booking';
import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input,Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Required, extractUserId,formatPrice } from 'src/app/components/database/database.component';
import { PromoCode } from 'src/app/models/PromoCode';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';
import { BookingDatabaseService } from 'src/app/services/providers/booking-database.service';
export interface ProfileModalData {

  title?: string;
  body?: string;
  price?: number;
  start_date?: string;
  end_date?: string;
  image?: string;
  button: {

    label: string;
    action: () => void;

  };

}

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.scss'],
})
export class RoomModalComponent {

  @Input() @Required room?: KeyValue<string, Room>;
  @Input() @Required room_type?: KeyValue<string, RoomType>;
  @Input() promo?: KeyValue<string, PromoCode>;
  @Output() closeModal: EventEmitter<KeyValue<string, [Booking, Room, RoomType]>> = new EventEmitter();

  range?: { check_in: Date; check_out: Date; };

  constructor (private router: Router, private booking_service: BookingDatabaseService, private toastController: ToastController) { }


  saveBookingRange($event: { check_in: Date; check_out: Date; }) {

    this.range = $event;
  

  }

  formatDate(date: Date | undefined) {

    return date ? parseDate(date).split('-').reverse().join('/') : 'No Date selected';

  }
  addBooking() {

    if (this.range) {
      const user_id = extractUserId();


      if (user_id) {


        if (this.room?.key) {
          this.booking_service.getAllRoomsBookings(this.room.key).subscribe(conflicts => {


            const conflicting_bookings = [];

            for (let booking of conflicts.bookings) {

              if (!(this.range!.check_out < new Date(booking[1].check_in) || this.range!.check_in > new Date(booking[1].end_date))) {

                conflicting_bookings.push(booking[0]);
              }
            }



            if (conflicting_bookings.length) {

              this.displayToast('Conflicting bookings');

            } else {

              const booking: Booking = {

                check_in: parseDate(this.range!.check_in),
                end_date: parseDate(this.range!.check_out),
                promo_id: this.promo?.key || '0',
                exhausted: false,
                room_id: this.room!.key,
                user_id: user_id

              };

              this.booking_service.addNewBooking(booking).subscribe(data => {

                this.closeModal.emit({
                  key: data,
                  value: [booking, this.room!.value, this.room_type!.value]
                });

              });

            }
          });

        } else {

          console.error('Invalid id or room key');

        }
      } else {


        this.router.navigate(['auth']);
      }
    }
  }

  async displayToast(body: string) {

    const toast = await this.toastController.create({
      message: body,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();

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

  daysBetween(startDate: Date | undefined, endDate: Date| undefined): number {

    if(startDate && endDate) {

      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const start = new Date(startDate.getTime()); // Copy start date to avoid modifying it
      start.setHours(0, 0, 0, 0); // Set start date to the beginning of the day
      const end = new Date(endDate.getTime()); // Copy end date to avoid modifying it
      end.setHours(0, 0, 0, 0); // Set end date to the beginning of the day
      const diffDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
      return diffDays;
    }
    return 0;
  }

  get formatTotalPrice(): string {
    return formatPrice((this.room_type?.value?.price || 0) * this.daysBetween(this.range?.check_in, this.range?.check_out), false, false);
  }
  get formatNewTotalPrice(): string | undefined {

    if (this.room_type) {

      return Math.round(this.room_type.value.price * this.daysBetween(this.range?.check_in, this.range?.check_out) * ((this.promo?.value.change || 0) / 100)).toString();

    } else {

      return '';

    }
  }




}
