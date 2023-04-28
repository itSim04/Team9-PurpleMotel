import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Required, formatPrice } from 'src/app/components/database/database.component';
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
  stored_data?: unknown;
  show_num_input?: boolean;
}

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})

export class ProfileModalComponent {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() @Required data?: ProfileModalData

  performAction() {

    if (this.data?.button?.action)
      this.data.button.action(this.data.stored_data);


  }

  formatDate(date: string | undefined) {

    return date ? date.split('-').reverse().join('/') : 'No Date selected';

  }
  changeQuantity(change: number) {

    if (this.data) {
      let seats = this.data.stored_data as number;
      console.log(seats)

      if (seats + change >= 0) {
        seats += change;
        this.data.stored_data = seats;
      }
    }

  }

  get formatTotalPrice(): string {
    if (this.data) {
      if(this.data.price && this.data.stored_data){
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
