import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface QuickDialogData {
    title: string,
    body: string,
    button_true: string,
    button_false: string;
}

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'quick.component.html',
})
export class QuickDialogComponent {

    result = 0;
    content: QuickDialogData;
    constructor (@Inject(MAT_DIALOG_DATA) public data: QuickDialogData) {
        this.content = data;
    }
}