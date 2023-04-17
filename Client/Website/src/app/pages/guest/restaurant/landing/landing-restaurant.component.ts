import { ChefListDialogService } from './../../../../services/dialogs/chef-list/chef-list.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './landing-restaurant.component.html',
  styleUrls: ['./landing-restaurant.component.scss']
})
export class RestaurantLandingComponent {

  constructor(public chef_dialog: ChefListDialogService) {}
}
