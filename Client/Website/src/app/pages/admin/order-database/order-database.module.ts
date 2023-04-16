import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDatabaseComponent } from './order-database.component';
import { DatabaseModule } from 'src/app/components/database/database.module';
import { NavBarModule } from "../../../components/general/nav-bar/nav-bar.module";


@NgModule({
    declarations: [
        OrderDatabaseComponent
    ],
    exports: [
        OrderDatabaseComponent,
    ],
    imports: [
        CommonModule,
        NavBarModule,
        DatabaseModule
    ]
})
export class OrderDatabaseModule { }
