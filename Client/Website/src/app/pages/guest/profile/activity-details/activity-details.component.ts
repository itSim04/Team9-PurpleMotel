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

  @Input() title!: string;
  @Input() description!: string;
  @Input() capacity!: number;
  @Input() price!: number;
  @Input() start_date!: string;
  @Input() end_date!: string;
  @Input() activity!: Activity;
  @Input() registration!: Registration;

  formatPrice(price: number) {

    return formatPrice(price);

  }

  formatOccupancy(size1: number, size2: number, size3: number) {

    return formatOccupancy([size1, size2, size3])

  }
}
