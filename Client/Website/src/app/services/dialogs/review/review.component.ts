import { extractUserId } from 'src/app/components/database/database.component';
import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { Review } from './../../../models/Room';
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-review-dialog',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})
export class ReviewDialogComponent {

    result: Review = {

        user_id: '-1',
        room_id: '-1',
        content: '',
        title: '',
        date: parseDate(new Date()),
        stars: 0


    };
    constructor (@Inject(MAT_DIALOG_DATA) public data: { room_id: string; }, dialog: MatDialogRef<ReviewDialogComponent>) {
        
        console.log(extractUserId());
        this.result.room_id = data.room_id;
        const user_id = extractUserId();
        if (user_id) {

            this.result.user_id = user_id;

        } else {

            dialog.close();

        }
    }
}