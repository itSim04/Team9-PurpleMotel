import { Component, Input } from '@angular/core';
import { formatPrice } from 'src/app/components/database/database.component';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { formatOccupancy } from 'src/app/pages/admin/room-database/room-database.component';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent {

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
