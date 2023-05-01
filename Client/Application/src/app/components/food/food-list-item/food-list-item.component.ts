import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { KeyValue } from '@angular/common';
import { Component,Input, OnInit} from '@angular/core';
import { Food } from 'src/app/models/Food';
import { FoodListPopupService } from '../food-list-popup/food-list-popup.service';
import { ProfileModalData } from 'src/app/pages/guest/profile/profile-modal/profile-modal.component';
import { Order } from 'src/app/models/Order';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';
import { extractUserId, formatPrice } from '../../database/database.component';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss'],
})
export class FoodListItemComponent implements OnInit {

  @Input() food!: KeyValue<string, Food>;

  @Input() quantity = 0;


  isModalOpen = false;

  active_data?: ProfileModalData;

  constructor (public food_service: FoodListPopupService, private animationCtrl: AnimationController, private router: Router) { }

  ngOnInit() { }

  openPopup() {
    const dialogRef = this.food_service.openDialog(this.food.key, this.food.value.label, this.food.value.description, this.food.value.price, this.food.value.is_served, this.food.value.image, this.quantity);
    dialogRef.afterClosed().subscribe(result => this.quantity = (result as number));
  }

  formatFood(): ProfileModalData {

    const food = this.food!.value;

    return {

      title: food.label,
      body: food.description,
      price: food.price,
      hide_dates: true,
      image: food.image,
      num_name: 'Quantity',
      button: {
        label: 'Add To Cart',
        action: (num: unknown) => {

          this.quantity = num as number
          this.addToCart();
          this.closeModal();

        },
      },
      stored_data: this.quantity,
      show_num_input: true,
    };
  }

  async openModal(data: ProfileModalData) {

    this.active_data = undefined;

    this.isModalOpen = true;

    this.active_data = data;

  }

  async closeModal() {



    this.active_data = undefined;

    this.isModalOpen = false;

  }
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };



  get formatPrice(): string {

    return formatPrice(this.food.value.price);
  }


  get formatTotalPrice(): string {
    const numStr = (this.food.value.price * this.quantity).toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    return numArr?.join(',')?.split('').reverse().join('') || numStr;
  }

  changeQuantity(change: number) {

    this.quantity += change;

  }

  addToCart() {

    const user_id = extractUserId();
    if (user_id) {
      const cart = localStorage.getItem('cart');
      let item: Order;

      if (!cart) {

        item = {

          user_id: user_id,
          date: parseDate(new Date()),
          status: '0',
          food: []

        };

      } else {

        item = JSON.parse(cart) as Order;

      }

      const temp = item.food.find(t => t.id == this.food.key);

      if (temp) {

        temp.quantity = this.quantity;

      } else {

        item.food.push({

          id: this.food.key,
          quantity: this.quantity

        });

      }

      localStorage.setItem('cart', JSON.stringify(item));



    } else {

      setTimeout(() => {

        this.router.navigate(['auth']);
      });

    }
  }


}



