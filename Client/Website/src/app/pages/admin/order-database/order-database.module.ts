import { NavBarModule } from 'src/app/components/general/nav-bar/nav-bar.module';
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
        DatabaseModule,
        NavBarModule
    ]
})
export class OrderDatabaseModule { }
