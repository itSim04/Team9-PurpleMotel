import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Booking } from 'src/app/models/Booking';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ])])]

})
export class ProfileComponent {
  bookings!: Map<number, Booking>;
}
