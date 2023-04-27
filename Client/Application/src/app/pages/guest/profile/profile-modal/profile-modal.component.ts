import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Required, formatPrice } from 'src/app/components/database/database.component';

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

  @Input() @Required data?: ProfileModalData
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  performAction() {

    if (this.data?.button?.action)
      this.data.button.action(this.data.stored_data);


  }
  changeQuantity(change: number) {

    if (this.data) {
      let seats = this.data.stored_data as number;

      if (seats + change >= 0) {
        seats += change;
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
