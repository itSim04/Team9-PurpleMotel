import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.scss']
})
export class ActivityListItemComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() capacity!: number;
  @Input() price!: number;
  //@Input() seats!: number;
  @Input() start_date!: string;
  @Input() end_date!: string;

  get formatTotalPrice(): string {
    const numStr = (this.price).toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;
  }

  get formatPrice(): string {
    const numStr = this.price.toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;
  }

 /* changeQuantity(change: number) {

    this.seats += change;

  }*/

}
