import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss'],
})
export class FoodListItemComponent  implements OnInit {

  @Input() food!: KeyValue<string, Food>;

  @Input() quantity = 0;

  constructor() {}

  ngOnInit() {}

}
