import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { Router } from '@angular/router';
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

    constructor (private promo_service: PromoDialogService, private dialog: MatDialogRef<PromoDialogComponent>, private router: Router, private authentication: AuthenticationDialogService) { }

    apply() {

        this.promo_service.applyPromoCode(this.promo).subscribe(response => {

            switch (response) {

                case 200:

                    this.message = 'Promo code already registered';
                    break;

                case 201:

                    this.dialog.close();
                    break;

                case 400:

                    this.message = 'You already have a promo code';
                    break;

                case 403:

                    this.router.navigate(['/']);
                    this.authentication.openDialog('login');
                    break;

                case 404:

                    this.message = 'Invalid Promo Code';
                    break;

            }

        });

    }



}