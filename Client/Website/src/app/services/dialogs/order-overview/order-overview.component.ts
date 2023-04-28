import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { formatPrice } from 'src/app/components/database/database.component';
import { OrderDatabaseService } from '../../providers/order-database.service';
import { KeyValue } from '@angular/common';


@Component({
    selector: 'app-order-overview-dialog',
    styleUrls: ['order-overview.component.scss'],
    templateUrl: 'order-overview.component.html',
})
export class OrderOverviewDialogComponent {



    order?: KeyValue<string,Order>;

    foods: Map<string, Food> = new Map();

    constructor (@Inject(MAT_DIALOG_DATA) public data: { food: Map<string, Food>; order: KeyValue<string,Order> }, private order_service: OrderDatabaseService) {

        this.foods = data.food;
        this.order = data.order;

    }

    formatPrice(data: number, quantity: number) {

        return formatPrice(data * quantity, true);

    }

    eligibileCancellation(){
       return this.order?.value.status != "2";
    }




}