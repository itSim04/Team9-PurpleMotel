import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {
  @Input() check_in!: string;
  @Input() end_date!: string;
  @Input() exhausted!: boolean;
}
