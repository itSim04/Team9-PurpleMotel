import { Component } from '@angular/core';
import { ChefListDialogService } from 'src/app/services/utility/chef-list.service';

@Component({
  selector: 'app-menu',
  templateUrl: './landing-restaurant.component.html',
  styleUrls: ['./landing-restaurant.component.scss']
})
export class RestaurantLandingComponent {

  constructor(public chef_dialog: ChefListDialogService) {}
}
