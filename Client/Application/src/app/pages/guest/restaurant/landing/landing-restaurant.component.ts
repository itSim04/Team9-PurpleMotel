import { Component } from '@angular/core';
import { UrlBuilderService } from 'src/app/services/utility/url-builder.service';
import { ProfileModalData } from '../../profile/profile-modal/profile-modal.component';
import { AnimationController } from '@ionic/angular';




@Component({
  selector: 'app-menu',
  templateUrl: './landing-restaurant.component.html',
  styleUrls: ['./landing-restaurant.component.scss']
})
export class RestaurantLandingComponent {
  
  chefs = this.url.getImage('chefs-background')
  restaurant = this.url.getImage('restaurant-main')
  active_data?: ProfileModalData;
  isModalOpen = false;

  constructor(private url: UrlBuilderService, private animationCtrl: AnimationController) {}

  getTerm(arg0: string) {

    return (JSON.parse(localStorage.getItem('information')!))[arg0];

  }

  getEntry(arg0: string): ProfileModalData{
    let data = {
      title: arg0,
      body: this.display,
      hide_dates: true,
      custom_height: '50%',
      
    }
    return data
  }

  get display() {

    return (JSON.parse(localStorage.getItem('information')!))['chef_list'].split('\\n');

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
