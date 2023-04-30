import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { InformationDatabaseService } from './services/providers/information-database.service';


declare global {
  interface Map<K, V> {
    getPair(property: K): KeyValue<K, V>;

  }
}

if (!Map.prototype.getPair) {

  Map.prototype.getPair = function <K, V>(property: K): KeyValue<K, V> {

    return {

      key: property,
      value: this.get(property)

    };

  };

}


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit {

  constructor (private platform: Platform, public information_service: InformationDatabaseService) {
    this.initialize();

    information_service.getTerms().subscribe(data => {

      localStorage.setItem('information', JSON.stringify(data));

    });
  }

  ngOnInit() {

    this.syncTheme();

  }



  initialize() {
    this.platform.ready().then(() => {
      // Check if the PushNotifications plugin is available
      if (PushNotifications) {
        // Register for push notifications

        provideFirebaseApp(() => initializeApp(environment.firebase)),
          PushNotifications.register();

        // Listen for push notification events
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
          console.log('Received push notification', notification);
        });
      } else {
        console.warn('PushNotifications plugin is not available on this platform');
      }
    });
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.initPushNotifications();
  //   });
  // }

  initPushNotifications() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('FCM Token:', token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('FCM registration error:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Received in foreground', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (actionPerformed: ActionPerformed) => {
      console.log('Received in background', actionPerformed.notification);
    });

  }

  syncTheme() {


    document.body.classList.remove('auto');
    document.body.classList.remove('dark');
    document.body.classList.remove('light');

    const theme = localStorage.getItem('theme') || '';

    switch (theme) {

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

    setTimeout(() => {

      this.syncTheme();

    }, 10000);

  }
}


