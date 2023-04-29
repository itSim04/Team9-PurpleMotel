import { FoodListPopupService } from './../food-list-popup/food-list-popup.service';
import { Order } from './../../../models/Order';
import { Component, Input, OnInit } from '@angular/core';
import { formatPrice } from '../../database/database.component';
import { KeyValue } from '@angular/common';
import { Food } from 'src/app/models/Food';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss']
})
export class FoodListItemComponent {

  @Input() food!: KeyValue<string, Food>;

  @Input() quantity = 0;

  image = `../../../../assets/food-${Math.floor(Math.random() * 8) + 1}.jpg`;

  constructor (private food_dialog: FoodListPopupService) { }

  openPopup() {

    const dialogRef = this.food_dialog.openDialog(this.food.value.label, this.food.value.description, this.food.value.price, this.food.key, this.quantity, this.food.value.image);
    dialogRef.afterClosed().subscribe(result => this.quantity = (result as number));

  }
  get formatPrice(): string {

    return formatPrice(this.food.value.price);
  }


}
