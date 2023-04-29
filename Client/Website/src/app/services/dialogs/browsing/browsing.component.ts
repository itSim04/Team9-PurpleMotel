
import { extractUser } from 'src/app/components/database/database.component';
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Announcement } from 'src/app/models/Announcement';
import { User } from 'src/app/models/User';



@Component({
    selector: 'app-browsing-dialog',
    templateUrl: 'browsing.component.html',
    styleUrls: ['browsing.component.scss']
})
export class BrowsingDialogComponent {

    list: Announcement[] = [];
    users: Map<string, User>;
    constructor (@Inject(MAT_DIALOG_DATA) public data: {

        announcements: Announcement[],
        users: Map<string, User>;

    }) {

        const tier = extractUser()?.tier || '-1';

        console.log(tier, data.announcements.at(0)?.concerned_tier);
        this.list = data.announcements.filter(t => t.concerned_tier.toString() == tier?.toString()).reverse();
        this.users = data.users;

        console.log(this.list, this.users);

    }
}