import { Router } from '@angular/router';
import { PromoDatabaseService } from 'src/app/services/providers/promo-database.service';
import { Platform, ToastController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  theme = '';
  promo = '';
  constructor (@Inject(DOCUMENT) private document: Document, private platform: Platform, private toastController: ToastController, private promo_service: PromoDatabaseService, private router: Router) { }

  ngOnInit() {

    this.theme = localStorage.getItem('theme') || 'system';

  }

  // async ionViewDidEnter() {
  //   await this.platform.ready().then(() => {
  //     document.body.classList.toggle('dark', true);
  //   });
  // }

  changeTheme(theme: Event) {

    this.document.body.classList.remove('auto');
    this.document.body.classList.remove('dark');
    this.document.body.classList.remove('light');

    localStorage.setItem('theme', (theme as CustomEvent).detail.value);

    switch ((theme as CustomEvent).detail.value) {

      case 'light':
        document.body.classList.add('light');
        break;
      case 'dark':

        document.body.classList.add('dark');
        break;
      case 'system':
      default:

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        console.log(prefersDark);

        if (prefersDark.matches) {

          document.body.classList.add('dark');
        } else {

          document.body.classList.remove('light');
        }
    }
  }

  applyPromo() {

    this.promo_service.applyPromoCode(this.promo).subscribe(response => {

      switch (response) {

        case 200:

          this.displayToast('Promo code already registered');
          break;

        case 201:


          this.displayToast('Promo code successfully registered');
          break;

        case 400:

          this.displayToast('You already have a promo code');
          break;

        case 403:

          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('token_time');
          this.router.navigate(['/auth']);
          break;

        case 404:

          this.displayToast('Invalid Promo Code');
          break;

      }

    });

  }
  async displayToast(body: string) {

    const toast = await this.toastController.create({
      message: body,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();

  }



}
