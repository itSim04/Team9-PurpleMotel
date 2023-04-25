import { Component } from '@angular/core';
import { DisplayDialogService } from 'src/app/services/utility/display.service';

@Component({
  selector: 'app-menu',
  templateUrl: './landing-restaurant.component.html',
  styleUrls: ['./landing-restaurant.component.scss']
})
export class RestaurantLandingComponent {

  constructor(public display_dialog: DisplayDialogService) {}
}
