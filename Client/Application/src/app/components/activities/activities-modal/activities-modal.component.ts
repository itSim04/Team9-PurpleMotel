import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Activity } from 'src/app/models/Activity';


@Component({
  selector: 'app-activities-modal',
  templateUrl: './activities-modal.component.html',
  styleUrls: ['./activities-modal.component.scss']
})
export class ActivitiesModalComponent {

  @Input() activity!: Activity;
  @Input() price!: Activity;
  @Input() start_date!: Activity;
  @Input() end_date!: Activity;

  constructor(private modal_params: NavParams) {

    
    this.activity = modal_params.get('data');
    this.price = modal_params.get('data').price;
    this.start_date = modal_params.get('data').start_date;
    this.end_date = modal_params.get('data').end_date;
  
  }
 

  get formatPrice(): string {
    const numStr = this.activity.price.toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;
  }
}
