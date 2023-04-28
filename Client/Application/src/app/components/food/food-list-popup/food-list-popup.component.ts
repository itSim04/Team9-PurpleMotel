import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image } from 'src/app/models/Image';
import { Ingredient } from 'src/app/models/Ingredient';

export interface FoodPopup{
  id: string
  label: string
  description: string
  price: number
  is_served: boolean
  //ingredients: Ingredient[]
  //image: Image
}

@Component({
  selector: 'app-food-list-popup',
  templateUrl: './food-list-popup.component.html',
  styleUrls: ['./food-list-popup.component.scss'],
})
export class FoodListPopupComponent  implements OnInit {

  id: string;
  label: string;
  description: string;
  price: number;
  is_served: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FoodPopup) {
    this.id = data.id;
    this.label = data.label;
    this.description = data.description;
    this.price = data.price;
    this.is_served = data.is_served;
  }

  ngOnInit() {}

}
