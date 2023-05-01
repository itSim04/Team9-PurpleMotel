import { Component, EventEmitter,Output } from '@angular/core';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';


@Component({
  selector: 'app-quick-availability',
  templateUrl: './quick-availability.component.html',
  styleUrls: ['./quick-availability.component.scss'],
})
export class QuickAvailabilityModalComponent {

  adults = 0;
  children = 0;

  check_in = '';
  check_in_open = false;
  check_out_open = false;
  check_out = '';
  @Output() closeModal: EventEmitter<{

    check_in: string;
    check_out: string;
    adults: number;
    children: number;


  }> = new EventEmitter();

  range?: { check_in: Date; check_out: Date; };

  constructor () { }


  updateCheckin(s: Event) {

    this.check_in = parseDate(new Date((s as CustomEvent).detail.value));

    this.check_in_open = false;

  }
  updateCheckout(s: Event) {

    this.check_out = parseDate(new Date((s as CustomEvent).detail.value));

    this.check_out_open = false;

  }
  saveBookingRange($event: { check_in: Date; check_out: Date; }) {

    this.range = $event;

  }

  formatDate(date: Date | undefined) {

    return date ? parseDate(date).split('-').reverse().join('/') : 'No Date selected';

  }



}
