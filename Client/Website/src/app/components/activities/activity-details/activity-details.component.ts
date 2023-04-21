import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatPrice, Required } from 'src/app/components/database/database.component';
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
  @Input() @Required registration_id!: string;

  @Output() delete = new EventEmitter<string>();

  formatPrice(price?: number) {

    return formatPrice(price);

  }

  get past() {

    if (this.registration)
      return (new Date() >= new Date(this.registration.start_date));
    else
      return true;
  }

}
