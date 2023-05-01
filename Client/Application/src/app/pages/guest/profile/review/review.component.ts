import { IntelAttributes } from '../../../../models/Room';
import { Component, EventEmitter, Output } from '@angular/core';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewModalComponent {

  review = '';
  title = '';
  rating = 0;
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
    review: string,
    rating: number,
    title: string,


  }> = new EventEmitter();

  range?: { check_in: Date; check_out: Date; };
  constructor () { }

  get properties() {

    return Object.keys(this.intel) as (keyof IntelAttributes)[];

  }

  saveBookingRange($event: { check_in: Date; check_out: Date; }) {

    this.range = $event;
    console.log($event, this.range);

  }

  formatDate(date: Date | undefined) {

    return date ? parseDate(date).split('-').reverse().join('/') : 'No Date selected';

  }



}
