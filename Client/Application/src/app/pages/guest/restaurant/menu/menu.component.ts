import { OrderDatabaseService } from './../../../../services/providers/order-database.service';
import { AnimationController } from '@ionic/angular';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Food } from "src/app/models/Food";
import { FoodCategory } from "src/app/models/FoodCategory";
import { Order } from "src/app/models/Order";
import { FoodDatabaseService } from "src/app/services/providers/food-database.service";
import { extractUser, formatPrice } from 'src/app/components/database/database.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  foods: Map<string, Food> = new Map();
  food_categories: Map<string, FoodCategory> = new Map();
  order?: Order;

  isModalOpen = false;

  constructor (private order_service: OrderDatabaseService, private food_service: FoodDatabaseService, private router: Router, private animationCtrl: AnimationController) {

    this.downloadCart();

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

  ngOnInit() {

    this.food_service.getAllFoods().subscribe({
      next: data => {
        
        this.foods = data.foods;


        this.food_categories = data.categories;

      },

      error: error => {
        console.error(error);
      }
    });
  }

  scroll(search: string) {
    document.getElementById(search)?.scrollIntoView();

  }

  downloadCart() {

    const cart = localStorage.getItem('cart');

    if (cart) {

      this.order = (JSON.parse(cart) as Order);

    } else {

      this.order = undefined;

    }
  }

  getQuantity(arg0: string): number {

    if (this.order) {
      return this.order?.food.find(t => t.id == arg0)?.quantity || 0;
    } else {
      return 0;

    }

  }


  invokeCart() {

    if (extractUser()) {

      this.downloadCart();

      console.log(this.order);
      setTimeout (() => {

        this.isModalOpen = true;
      }, 100);

    } else {

      this.router.navigate(['auth']);
   
    }
  }

  formatPrice(data: number, quantity: number) {

    return formatPrice(data * quantity, true);

  }

  changeQuantity(change: number, id: number) {

    if (this.order) {

      this.order.food[id].quantity += change;

      let index = 0;
      this.order.food.forEach(t => {

        if (!t.quantity)
          this.order!.food.splice(index, 1);

        index++;
        

      });


      localStorage.setItem('cart', JSON.stringify(this.order));

    }
  }

  uploadCart() {

    if (this.order) {

      this.order_service.addNewOrder(this.order).subscribe({
        
        next: data => {

          localStorage.removeItem('cart');
          this.order = undefined;
          this.isModalOpen = false;

          setTimeout(() => {

            this.router.navigate(['/profile']);

          }, 200);

        },
        error: (err) => {

          console.log('Error', err);


        }

      });

    }

  }



}
