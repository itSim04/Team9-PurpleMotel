import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDatabaseComponent } from './order-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';


@NgModule({
    declarations: [
        OrderDatabaseComponent
    ],
    exports: [
        OrderDatabaseComponent,
    ],
    imports: [
        CommonModule,
        DatabaseModule
    ]
})
export class OrderDatabaseModule { }
