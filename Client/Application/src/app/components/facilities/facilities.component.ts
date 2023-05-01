import { AnimationController } from '@ionic/angular';
import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Facility } from 'src/app/models/Facility';
import { ProfileModalData } from 'src/app/pages/guest/profile/profile-modal/profile-modal.component';


@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent {

  @Input() facility?: KeyValue<string, Facility>;

  active_data?: ProfileModalData;
  isModalOpen: boolean = false;

  constructor (private animationCtrl: AnimationController) { }
  async openModal(data: ProfileModalData) {

    this.active_data = undefined;

    this.isModalOpen = true;

    this.active_data = data;

  }

  formatFacility(): ProfileModalData {

    const facility = this.facility!.value;


    return {

      title: facility.title,
      body: facility.description,
      image: facility.image[0],
      hide_dates: true,
      custom_height: '50%'
    };
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


  getColor(seed: string) {

    let num_seed = Number.parseInt(seed);
    const currentRandom = Math.random;

    // Initialize random number generator with given seed
    Math.random = () => {
      const x = Math.sin(num_seed++ * 0.389) * 10000;
      return x - Math.floor(x);
    };

    // 60% chance of the first value being picked
    const pickFirstValue = Math.random() < 0.6;

    // Define three random string values
    const value1 = '--ion-color-primary';
    const value2 = '--ion-color-secondary';
    const value3 = '--ion-color-tertiary';

    // Assign values to an array based on probability
    if (pickFirstValue) {
      return value1;
    } else if (Math.random() < 0.5) {
      return value2;
    } else {
      return value3;
    }
  }


}
