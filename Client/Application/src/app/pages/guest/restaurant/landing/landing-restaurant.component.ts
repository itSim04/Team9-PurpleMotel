import { Component } from '@angular/core';
import { UrlBuilderService } from 'src/app/services/utility/url-builder.service';



@Component({
  selector: 'app-menu',
  templateUrl: './landing-restaurant.component.html',
  styleUrls: ['./landing-restaurant.component.scss']
})
export class RestaurantLandingComponent {

  constructor(private url: UrlBuilderService) {}
}
