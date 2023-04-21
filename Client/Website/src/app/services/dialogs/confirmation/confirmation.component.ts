import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationDialogData {
    title: string,
    body: string,
    button_true: string,
    button_false: string;
}

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'confirmation.component.html',
    styleUrls: ['confirmation.component.scss']
})
export class ConfirmationDialogComponent {
    content: ConfirmationDialogData;
    constructor (@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
        this.content = data;
    }
}