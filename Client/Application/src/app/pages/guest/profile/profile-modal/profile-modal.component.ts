import { RoomDatabaseService } from 'src/app/services/providers/room-database.service';
import { IntelAttributes } from './../../../../models/Room';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Required, formatPrice, extractUserId } from 'src/app/components/database/database.component';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';

export interface ProfileModalData {

  title?: string;
  body?: string;
  price?: number;
  start_date?: string;
  end_date?: string;
  image?: string;
  button?: {

    label: string;
    action: (...args: unknown[]) => void;


  };

  custom_action?: {

    icon: string,
    id: string;
    display: boolean;

  };

  hide_dates?: boolean;

  custom_height?: string;
  stored_data?: unknown;
  show_num_input?: boolean;
  num_name?: string;

  hide_description?: boolean;
  hide_image?: boolean;
}

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})

export class ProfileModalComponent {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() @Required data?: ProfileModalData;

  isReviewOpened = false;

  performAction() {

    if (this.data?.button?.action)
      this.data.button.action(this.data.stored_data);


  }

  openReview() {

    this.isReviewOpened = true;

  }

  constructor (private room_service: RoomDatabaseService) { }

  closeReview($event: { intel: IntelAttributes, review: string, rating: number, title: string; }) {


    if ($event) {

      this.room_service.addReview(
        {

          content: $event.review,
          date: parseDate(new Date()),
          room_id: this.data?.custom_action?.id || '0',
          stars: $event.rating,
          title: $event.title,
          user_id: extractUserId()!

        },
        $event.intel
      ).subscribe({

        next: data => {

          this.isReviewOpened = false;
        },
        error: error => {


          console.error(error);

        }
      });




    } else {

      this.isReviewOpened = false;

    }

  }

  formatDate(date: string | undefined) {

    return date ? date.split('-').reverse().join('/') : 'No Date selected';

  }
  changeQuantity(change: number) {

    if (this.data) {
      let seats = this.data.stored_data as number;
     

      if (seats + change >= 0) {
        seats += change;
        this.data.stored_data = seats;
      }
    }

  }

  get formatTotalPrice(): string {
    if (this.data) {
      if (this.data.price && this.data.stored_data) {
        const seats = this.data.stored_data as number;
        const totalPrice = this.data.price * seats;
        return formatPrice(totalPrice);
      }
      else {
        return '';
      }

    }
    return '';
  }



}
