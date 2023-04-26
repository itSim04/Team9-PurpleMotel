import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { Interface } from 'readline';
import { Required, extractUserId } from 'src/app/components/database/database.component';
import { Activity } from 'src/app/models/Activity';
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

  }

}

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.scss'],
})
export class RoomModalComponent {

  @Input() @Required room?: KeyValue<string, Room>;
  @Input() @Required room_type?: KeyValue<string, RoomType>;
  @Input() @Required promo?: KeyValue<string, PromoCode>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private booking_service: BookingDatabaseService, private toastController: ToastController) {}


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

            this.displayToast('Conflicting bookings');

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
      
      
      this.router.navigate(['auth']);

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

}
