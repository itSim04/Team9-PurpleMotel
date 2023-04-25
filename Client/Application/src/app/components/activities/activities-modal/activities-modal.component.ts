import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Activity } from 'src/app/models/Activity';
import { KeyValue } from '@angular/common';
import { RegistrationDatabaseService } from 'src/app/services/providers/registration-database.service';
import { extractUserId } from '../../database/database.component';


@Component({
  selector: 'app-activities-modal',
  templateUrl: './activities-modal.component.html',
  styleUrls: ['./activities-modal.component.scss']
})
export class ActivitiesModalComponent {

  @Input() activity?: KeyValue<string, Activity>;
  @Input() price!: number;
  @Input() start_date!: Date;
  @Input() end_date!: Date;
  @Input() seats!: number;


  constructor(private modal_params: NavParams, private modal_ctrl: ModalController, private registration_service: RegistrationDatabaseService) {


    this.activity = {
      key: modal_params.get('key'),
      value: modal_params.get('data')
    };
    this.price = modal_params.get('data').price;
    this.start_date = modal_params.get('data').start_date;
    this.end_date = modal_params.get('data').end_date;
    this.seats = modal_params.get('data').capacity;
  
  }

  get free() {

    let taken = 0;
    this.activity?.value.registrations.forEach(registration => {

      taken += registration.seats;

    });
  
    return (this.activity!.value.capacity - taken) - this.seats;

  }



  register() {

    const user_id = extractUserId();

    if (user_id && this.activity?.key) {

      this.registration_service.addNewRegistration({

        start_date: this.activity.value.start_date,
        end_date: this.activity.value.end_date,
        activity_id: this.activity!.key,
        user_id: user_id,
        seats: this.seats,
        

      }).subscribe();

    } else {

      console.error('Invalid id or activity key');

    }
  }

  closeModal() {
    this.modal_ctrl.dismiss()
  }

  get formatPrice(): string {
    const numStr = this.activity!.value.price.toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;
  }
}
