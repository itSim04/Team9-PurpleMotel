import { LanguageList } from './../../../models/LanguageList';
import { LanguageDatabaseService } from '../../../services/providers/language-database.service';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';
import { extractAnyPermission, extractUser } from '../../database/database.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() transparent = false;
  @Input() hide_auth = false;
  languages: Map<string, LanguageList> = new Map();
  constructor (private authentication_service: AuthenticationDialogService, private language_service: LanguageDatabaseService) { }


  ngOnInit() {

    this.language_service.getAllLanguageLists().subscribe(data => {
      
      this.languages = data.language_lists
      console.log(this.languages); 
    });

  }
  updateLanguage(arg0: any): any {
    
    
    const user = extractUser();
    if(user) {

      user.language = arg0;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();

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

