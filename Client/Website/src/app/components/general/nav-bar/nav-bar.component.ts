import { BrowsingDialogService } from './../../../services/utility/browsing.service';

import { UserDatabaseService } from './../../../services/providers/user-database.service';
import { LanguageList } from './../../../models/LanguageList';
import { LanguageDatabaseService } from '../../../services/providers/language-database.service';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { extractAnyPermission, extractUser, extractUserId } from '../../database/database.component';
import { Router } from '@angular/router';
import { AnnouncementDatabaseService } from 'src/app/services/providers/announcement-database.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() transparent = false;
  @Input() hide_auth = false;
  languages: Map<string, LanguageList> = new Map();
  constructor (private announcement_service: AnnouncementDatabaseService, private browsing: BrowsingDialogService, private router: Router, private user_service: UserDatabaseService, private authentication_service: AuthenticationDialogService, private language_service: LanguageDatabaseService) { }


  ngOnInit() {

    this.language_service.getAllLanguageLists().subscribe(data => {

      this.languages = data.language_lists;
      console.log(this.languages);
    });

  }
  openSupport() {

    const user = extractUser();
    const id = extractUserId();
    if (user && id) {

      if (user.tier == '0') {

        this.router.navigate(['guestchat/' + id]);

      } else {

        this.router.navigate(['adminchat']);

      }


    }


  }

  openNotifications() {

    this.announcement_service.getAllAnnouncements().subscribe((result) => {

      this.browsing.openDialog(Array.from(result.announcements.values()), result.users);
    });


  }
  updateLanguage(arg0: any): any {


    const user = extractUser();
    const user_id = extractUserId();
    if (user && user_id) {

      user.language = arg0;
      this.user_service.modifyUser(user_id, user).subscribe(data => {

        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
      });

    }

  }
  
  extractAnyPermission() {

    return extractAnyPermission();

  }

  get chosen_language() {

    return extractUser()?.language;

  }
  login() {

    this.authentication_service.openDialog("login");

  }

  signUp() {
    this.authentication_service.openDialog("register");
  }

  get active() {

    const user = extractUser(false);
    if (!user) {

      return undefined;

    } else {

      return (user.first_name + " " + user.last_name);

    }

  }

}

