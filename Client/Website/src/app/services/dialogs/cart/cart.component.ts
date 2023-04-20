import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { formatPrice } from 'src/app/components/database/database.component';
import { OrderDatabaseService } from '../../providers/order-database.service';


@Component({
    selector: 'app-cart-dialog',
    styleUrls: ['cart.component.scss'],
    templateUrl: 'cart.component.html',
})
export class CartDialogComponent implements OnInit {



    order?: Order;

    foods: Map<string, Food> = new Map();

    constructor (@Inject(MAT_DIALOG_DATA) public data: { food: Map<string, Food>; }, private order_service: OrderDatabaseService, private dialogRef: MatDialogRef<CartDialogComponent>) {

        this.foods = data.food;

    }

    ngOnInit() {

        const temp = localStorage.getItem('cart');
        if (temp) {

            this.order = (JSON.parse(temp) as Order);
        }

    }


    formatPrice(data: number, quantity: number) {

        return formatPrice(data * quantity, true);

    }

    changeQuantity(change: number, id: number) {

        if (this.order) {

            this.order.food[id].quantity += change;

            localStorage.setItem('cart', JSON.stringify(this.order));

        }
    }

    uploadCart() {

        if (this.order) {

            this.order_service.addNewOrder(this.order).subscribe({
                next: data => {

                    localStorage.removeItem('cart');
                    this.dialogRef.close();

                },
                error: (err) => {

                    console.log('Error', err);
                    

                }

            });

        }

    }





}