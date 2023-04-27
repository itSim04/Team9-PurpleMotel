import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { AnimationController, ModalController } from '@ionic/angular';
import { KeyValue } from '@angular/common';
import { extractUserId, formatPrice } from '../database/database.component';
import { RegistrationDatabaseService } from 'src/app/services/providers/registration-database.service';
import { ProfileModalData } from 'src/app/pages/guest/profile/profile-modal/profile-modal.component';
import { Facility } from 'src/app/models/Facility';



@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {


  ngOnInit() { }

  activities: Map<string, Activity> = new Map();
  facilities: Map<string, Facility> = new Map();
  registrations: Map<string, Registration> = new Map();
  active_data?: ProfileModalData;
  isModalOpen: boolean = false;
  @Input() activity?: KeyValue<string, Activity>;

  constructor(private registration_service: RegistrationDatabaseService, private animationCtrl: AnimationController) { }


  formatPrice(price?: number) {

    return formatPrice(price);

  }

  get past() {

    if (this.activity)
      return (new Date() >= new Date(this.activity.value.start_date));
    else
      return false;
  }
  formatActivity(): ProfileModalData {

    const activity = this.activity!.value;

    const registration = {
      activity_id: this.activity!.key,
      user_id: extractUserId()!,
      start_date: activity.start_date,
      end_date: activity.end_date,
      seats: 0,
    }
    return {

      title: activity.title,
      body: activity.description,
      price: activity.price,
      start_date: activity.start_date,
      end_date: activity.end_date,
      image: activity.image[0],
      button: {
        label: 'Register',
        action: (seats: unknown) => {

          registration.seats = seats as number;
          this.registration_service.addNewRegistration(registration).subscribe((data) => {

            this.registrations.set(data, registration);
            this.closeModal();

          });

        }
      },
      show_num_input: true,
    }
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
