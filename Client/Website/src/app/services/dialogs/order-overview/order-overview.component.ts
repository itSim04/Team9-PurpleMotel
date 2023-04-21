import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { formatPrice } from 'src/app/components/database/database.component';
import { OrderDatabaseService } from '../../providers/order-database.service';


@Component({
    selector: 'app-order-overview-dialog',
    styleUrls: ['order-overview.component.scss'],
    templateUrl: 'order-overview.component.html',
})
export class OrderOverviewDialogComponent {



    order?: Order;

    foods: Map<string, Food> = new Map();

    constructor (@Inject(MAT_DIALOG_DATA) public data: { food: Map<string, Food>; order: Order }, private order_service: OrderDatabaseService) {

        this.foods = data.food;
        this.order = data.order;

    }

    formatPrice(data: number, quantity: number) {

        return formatPrice(data * quantity, true);

    }




}