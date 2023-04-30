import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  theme = '';
  constructor (@Inject(DOCUMENT) private document: Document, private platform: Platform) { }

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

}
