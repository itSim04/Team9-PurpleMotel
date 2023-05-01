import { IntelAttributes } from './../../../../models/Room';
import { Component, EventEmitter, Output } from '@angular/core';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';


@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendModalComponent {

  adults = 0;
  children = 0;

  check_in = '';
  check_in_open = false;
  check_out_open = false;
  check_out = '';

  intel: IntelAttributes = {

    bathroom: 0,
    bed: 0,
    layout: 0,
    view: 0,
    smoke: 0,
    quiet: 0,
    proximity: 0,
    wifi: 0,
    tv: 0


  }
  @Output() closeModal: EventEmitter<{

    intel: IntelAttributes,
    check_in: string;
    check_out: string;
    adults: number;
    children: number;


  }> = new EventEmitter();

  range?: { check_in: Date; check_out: Date; };
  
  constructor () { }

  get properties() {

    return Object.keys(this.intel) as (keyof IntelAttributes)[];

  }

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
