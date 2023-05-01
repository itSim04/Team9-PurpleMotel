import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface WarningDialogData {
    title: string,
    body: string[],
    button: string,
}

@Component({
    selector: 'app-warning-dialog',
    templateUrl: 'warning.component.html',
})
export class WarningDialogComponent {

    content: WarningDialogData;
    
    constructor (@Inject(MAT_DIALOG_DATA) public data: WarningDialogData) {
        this.content = data;
    }
}