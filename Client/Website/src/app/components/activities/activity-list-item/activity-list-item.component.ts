import { extractUser, extractUserId } from 'src/app/components/database/database.component';
import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { formatPrice } from '../../database/database.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationDatabaseService } from 'src/app/services/providers/registration-database.service';


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

  constructor (private registration_service: RegistrationDatabaseService, private router:Router) { }

  get formatPrice(): string {
    const activity = this.activity;
    if (activity && activity.value) {
      return formatPrice(activity.value.price);
    } else {
      return '';
    }
  }

  get free() {

    let taken = 0;
    this.activity?.value.registrations.forEach(registration => {

      taken += registration.seats;

    });
    return (this.activity!.value.capacity - taken) - this.seats;

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

    const user_id = extractUserId();

    if (user_id && this.activity?.key) {

      this.registration_service.addNewRegistration({

        start_date: this.activity.value.start_date,
        end_date: this.activity.value.end_date,
        activity_id: this.activity!.key,
        user_id: user_id,
        seats: this.seats



      }).subscribe(()=>{
        this.router.navigate(['/profile']);
      });

    } else {

      console.error('Invalid id or activity key');

    }
  }
}
