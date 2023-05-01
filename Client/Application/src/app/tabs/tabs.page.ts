import { extractAnyPermission, extractUser, extractUserId } from 'src/app/components/database/database.component';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { Component} from '@angular/core';
import { AnimationController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AnnouncementDatabaseService } from '../services/providers/announcement-database.service';
import { Announcement } from '../models/Announcement';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage {

  isModalOpen = false;
  session_user: User;
  announcements: Map<string, Announcement> = new Map();

  closeMenu() {
    this.menuCtrl.close('main-content');
  }

  ionViewWillEnter() {
    const user = extractUser();

    if (user) {

      this.session_user = user;

    } else {

      this.router.navigate(['/auth/login']);
      throw new Error('User not found');

    }
  }
  constructor(private menuCtrl: MenuController, private router: Router,private animationCtrl: AnimationController, private announcements_service:AnnouncementDatabaseService) {
    
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
    if (user && id) {

      if (user.tier == '0') {

        this.router.navigate(['chat/guest/' + id])

      } else {

        this.router.navigate(['chat/admin'])

      }


    }


  }
  openAnnouncements() {

    const user = extractUser();
    const id = extractUserId();
    if (user && id) {
      
        this.isModalOpen = true;

    }


  }
  ngOnInit() {
    

    this.announcements_service.getAllAnnouncements().subscribe({
      next: data => {
      
        this.announcements = data.announcements;

      },

      error: error => {
        console.error(error);
      }
    });
  
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



  openAdmin() {

    const user = extractUser();
    const id = extractUserId();
    if (user && id) {

      this.router.navigate(['/admin'])

    }


  }

  isAdmin(): boolean {

    const user = extractUser();

    if (user) {

      return user.tier === '2' || extractAnyPermission();

    }
    return false;

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token_time');
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 250)

  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  get color() {

    if (this.router.url.includes('services')) {

      return 'var(--ion-color-secondary)';

    } else if (this.router.url.includes('rooms')) {

      return 'var(--ion-color-tertiary)';

    } else {

      return 'var(--ion-color-primary)';

    }

  }

}
