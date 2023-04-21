import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { PromoDialogService } from "../../utility/promo.service";


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