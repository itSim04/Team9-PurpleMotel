import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { formatPrice } from '../../database/database.component';
import { Router } from '@angular/router';
import { RegistrationDatabaseService } from 'src/app/pages/admin/registration-database/registration-database.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.scss']
})
export class ActivityListItemComponent {
  @Input() activity?: KeyValue<string, Activity>;
  @Input() price!: number;
  @Input() seats: number = 0;
  @Input() start_date!: string;
  @Input() end_date!: string;

  constructor (private registration_service: RegistrationDatabaseService, private snackBar: MatSnackBar) { }

  get formatPrice(): string {
    const activity = this.activity;
    if (activity && activity.value) {
      return formatPrice(activity.value.price);
    } else {
      return '';
    }
  }

  changeQuantity(change: number) {
    if (this.seats + change >= 0) {
      this.seats += change;
    }
  }

  get formatTotalPrice(): string {
    const activity = this.activity;
    if (activity && activity.value) {
      const totalPrice = activity.value.price * this.seats;
      return formatPrice(totalPrice);
    } else {
      return '';
    }
  }
  register() {

    const user_id = localStorage.getItem('id');


    if (user_id && this.activity?.key) {

      this.registration_service.addNewRegistration({

        start_date: this.activity.value.start_date,
        end_date: this.activity.value.end_date,
        activity_id: this.activity!.key,
        user_id: user_id,
        seats: this.seats



      }).subscribe();

    } else {

      console.error('Invalid id or activity key');

    }
  }
}
