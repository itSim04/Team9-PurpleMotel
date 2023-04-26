import { extractUser, extractUserId } from 'src/app/components/database/database.component';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage {

  session_user: User;

  closeMenu() {
    this.menuCtrl.close('main-content');
  }
  constructor (private menuCtrl: MenuController, private router: Router) {

    const user = extractUser();

    if (user) {

      this.session_user = user;

    } else {

      this.router.navigate(['/auth/login']);
      throw new Error('User not found');

    }

  }

  openSupport() {

    const user = extractUser();
    const id = extractUserId();
    if(user && id) {

      if(user.tier == '0') {

        this.router.navigate(['chat/guest/' + id])

      } else {

        this.router.navigate(['chat/admin'])

      }


    }


  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  get color() {

    if (this.router.url.includes('services')) {

      return '#D6B389';

    } else if (this.router.url.includes('restaurant')) {

      return '#930000';

    } else {

      return '#14274A';

    }

  }

}
