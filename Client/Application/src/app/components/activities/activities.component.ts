import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { formatPrice } from '../database/database.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  
  @Input() activity?: Activity;
  @Input() registration?: Registration;

  formatPrice(price?: number) {

    return formatPrice(price);

  }

  get past() {

    if (this.activity)
      return (new Date() >= new Date(this.activity.start_date));
    else
      return false;
  }

}
