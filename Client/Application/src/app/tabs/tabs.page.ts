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

  constructor(private router: Router) { }

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
