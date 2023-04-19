import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { ProfileService } from "src/app/pages/guest/profile/profile.service";

export interface QuickDialogData {
    title: string,
    body: string,
    button_true: string,
    button_false: string;
}

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'promo.component.html',
})
export class PromoComponent {

    result = 0;
    content: QuickDialogData;
    promo = 0;

    constructor(@Inject(MAT_DIALOG_DATA) public data: QuickDialogData, private profile_service: ProfileService, private router: Router) {
        this.content = data;
    }



}