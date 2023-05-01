import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-display-dialog',
    styleUrls: ['display.component.scss'],
    templateUrl: 'display.component.html',
})
export class DisplayDialogComponent {


    term: string;
    title: string;
    constructor (@Inject(MAT_DIALOG_DATA) public data: {term: string, title: string}) {

      
        this.term = data.term;
        this.title = data.title;

    }
    get display() {

        return (JSON.parse(localStorage.getItem('information')!))[this.term].split('\\n');

    }


}