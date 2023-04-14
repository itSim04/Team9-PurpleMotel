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
export class FoodListItemComponent implements OnInit {

  @Input() food!: KeyValue<string, Food>;

  quantity = 0;

  image = `../../../../assets/food-${Math.floor(Math.random() * 8) + 1}.jpg`;

  constructor (private food_dialog: FoodListPopupService) { }

  ngOnInit() {

    const cart = localStorage.getItem('cart');

    if (cart) {

      this.quantity = (JSON.parse(cart) as Order).food.find(t => t.id == this.food.key)?.quantity || 0;

    }



  }

  openPopup() {

    const dialogRef = this.food_dialog.openDialog(this.food.value.label, this.food.value.description, this.food.value.price, this.food.key, this.quantity);
    dialogRef.afterClosed().subscribe(result => this.quantity = (result as number));

  }
  get formatPrice(): string {

    return formatPrice(this.food.value.price);
  }




}
