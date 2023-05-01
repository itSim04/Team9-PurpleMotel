import { Router } from '@angular/router';
import { PromoDatabaseService } from 'src/app/services/providers/promo-database.service';
import { AnimationController, Platform, ToastController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { extractUser, extractUserId } from 'src/app/components/database/database.component';
import { UserDatabaseService } from 'src/app/services/providers/user-database.service';
import { LanguageList } from 'src/app/models/LanguageList';
import { LanguageDatabaseService } from 'src/app/services/providers/language-database.service';
import { ProfileModalData } from '../guest/profile/profile-modal/profile-modal.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  theme = '';
  promo = '';
  languages: Map<string, LanguageList> = new Map();
  active_data?: ProfileModalData;
  isModalOpen = false;

  session_user = extractUser();

  ionViewWillEnter() {

    this.session_user = extractUser();

  }

  constructor (@Inject(DOCUMENT) private document: Document, private platform: Platform, private toastController: ToastController, private promo_service: PromoDatabaseService, private router: Router, private user_service: UserDatabaseService, private language_service: LanguageDatabaseService, public animationCtrl: AnimationController) { }

  debug(s: any) {


    this.user_service.modifyNotifications(extractUserId()!, { notifications: s.detail.checked ? '1' : '0' }).subscribe(data => {

      this.session_user!.notifications = s.detail.checked ? '1' : '0';
      localStorage.setItem('user', JSON.stringify(this.session_user));

      if (data) {

        this.displayToast('Notifications updated: ');
      }

    });

  }
  getTerm(arg0: string) {

    return (JSON.parse(localStorage.getItem('information')!))[arg0];

  }

  getEntry(arg0: string): ProfileModalData {
    let data = {
      title: arg0,
      body: this.getTerm(arg0),
      hide_dates: true,
      custom_height: '50%',
      hide_description: true,
      hide_image: true
    };
    return data;
  }


  ngOnInit() {

    this.theme = localStorage.getItem('theme') || 'system';


    this.language_service.getAllLanguageLists().subscribe(data => {

      this.languages = data.language_lists;

    });

  }

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

  get chosen_language() {

    return extractUser()?.language;

  }




  async openModal(data: ProfileModalData) {

    this.active_data = undefined;

    this.isModalOpen = true;

    this.active_data = data;

  }

  async closeModal() {



    this.active_data = undefined;

    this.isModalOpen = false;

  }
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

}
