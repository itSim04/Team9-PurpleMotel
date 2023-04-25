import { Component, Input } from '@angular/core';
//import { DAYS, MONTHS } from '../../room/room-overview/room-overview.component';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.component.html',
  styleUrls: ['./activity-overview.component.scss']
})
export class ActivityOverviewComponent {


  @Input() activity_name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() date!: Date;

  @Input() image!: string[];

  /*get formatRange(): string {

    return `${DAYS[this.date.getDay()].substring(0, 3)} ${this.date.getDate()} ${MONTHS[this.date.getMonth()]}`;

  }*/

  get formatPrice(): string {
    const numStr = this.price.toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;
  }
}
