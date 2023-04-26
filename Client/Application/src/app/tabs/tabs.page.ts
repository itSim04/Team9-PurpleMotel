import { extractUser } from 'src/app/components/database/database.component';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage {

  session_user: User;
  constructor(private router: Router) { 

    const user = extractUser();

    if(user) {

      this.session_user = user;

    } else {

      throw new Error('User not found');
      this.router.navigate(['/auth/login']);

    }

  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  get color() {

    if(this.router.url.includes('services')) {

      return '#D6B389';

    } else if(this.router.url.includes('restaurant')) {

      return '#930000';

    } else {

      return '#14274A';

    }

  }

}
