import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { formatPrice } from '../../database/database.component';

@Component({
  selector: 'app-activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.scss']
})
export class ActivityListItemComponent {
  @Input() activity?: KeyValue<string, Activity>;
  // @Input() title!: string;
  // @Input() description!: string;
  // @Input() capacity!: number;
   @Input() price!: number;
  @Input() seats: number=0;
  @Input() start_date!: string;
   @Input() end_date!: string;

  // get formatTotalPrice(): string {
  //   const numStr = (this.price).toString();

  //   // split the number string into groups of three digits from right to left
  //   const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

  //   // join the groups with commas and return the result from right to left
  //   return numArr?.join(',')?.split('').reverse().join('') || numStr;
  // }
  
  // get formatPrice(): string {

  //   return formatPrice(this.activity?.value.price);

  // }
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
    }else {
      return '';
    }
  }

  

}
