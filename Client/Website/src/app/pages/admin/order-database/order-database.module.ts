import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDatabaseComponent } from './order-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { forwardRef } from "@angular/core";



@NgModule({
    declarations: [
        OrderDatabaseComponent
    ],
    exports: [
        OrderDatabaseComponent,
        DatabaseModule
    ],
    imports: [
        CommonModule
    ]
})
export class OrderDatabaseModule { }
