import { PromoDialogService } from './promo.service';
import { PromoDatabaseService } from './../../../pages/admin/promo-database/promo-database.service';
import { RoomDatabaseService } from './../../../pages/admin/room-database/room-database.service';
import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { ProfileService } from "src/app/pages/guest/profile/profile.service";

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'promo.component.html',
    styleUrls: ['promo.component.scss']
})
export class PromoDialogComponent {

    promo = '0';
    message = '';

    constructor (private promo_service: PromoDialogService, private dialog: MatDialogRef<PromoDialogComponent>) { }

    apply() {

        this.promo_service.applyPromoCode(this.promo).subscribe(response => {

            switch (response) {

                case 200:

                    this.message = 'Promo code already registered';
                    break;

                case 201:

                    this.dialog.close();
                    break;

                case 403:
                case 404:

                    this.message = 'Invalid Promo Code';
                    break;

            }

        });

    }



}