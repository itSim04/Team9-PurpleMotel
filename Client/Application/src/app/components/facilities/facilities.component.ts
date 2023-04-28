import { AnimationController } from '@ionic/angular';
import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Facility } from 'src/app/models/Facility';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { ModalController } from '@ionic/angular';
import { FacilitiesModalComponent } from './facilities-modal/facilities-modal.component';
import { ProfileModalData } from 'src/app/pages/guest/profile/profile-modal/profile-modal.component';
import { extractUserId } from '../database/database.component';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent {

  @Input() facility?: KeyValue<string, Facility>;

  active_data?: ProfileModalData;
  isModalOpen: boolean = false;

  constructor (private modal_ctrl: ModalController, private animationCtrl: AnimationController) { }
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
      button: {

        label: 'Close',
        action: () => this.closeModal()

      }
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



}
