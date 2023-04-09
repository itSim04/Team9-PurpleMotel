import { Component } from '@angular/core';
import { PromoCodeDatabaseService } from './promo-database.service';
import { PromoCode } from 'src/app/models/PromoCode';
import { map } from 'rxjs';
import { DataInjection } from 'src/app/models/Database';
@Component({
  selector: 'app-promo-database',
  templateUrl: './promo-database.component.html',
  styleUrls: ['./promo-database.component.scss']
})
export class PromoDatabaseComponent {
  constructor (private promo_code_service: PromoCodeDatabaseService) { }



}
