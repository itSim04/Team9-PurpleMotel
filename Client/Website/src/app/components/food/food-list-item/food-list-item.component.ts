import { Component, Input } from '@angular/core';
import { formatPrice } from '../../database/database.component';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss']
})
export class FoodListItemComponent {

  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() quantity!: number;


  get formatTotalPrice(): string {
    
    const numStr = (this.price * this.quantity).toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;

  }

  get formatPrice(): string {
    
    return formatPrice(this.price);
  }

  changeQuantity(change: number) {

    this.quantity += change;

  }

  get image() {

    return `../../../../assets/food-${Math.floor(Math.random() * 8) + 1}.jpg`

  }

}
