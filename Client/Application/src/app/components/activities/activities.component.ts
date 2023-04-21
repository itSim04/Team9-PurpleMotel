import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { formatPrice } from '../database/database.component';
import { ModalController } from '@ionic/angular';
import { FacilitiesModalComponent } from '../facilities/facilities-modal/facilities-modal.component';
import { ActivitiesModalComponent } from './activities-modal/activities-modal.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent  implements OnInit {


  ngOnInit() {}
  
  @Input() activity?: Activity;
  

  constructor(private modal_ctrl: ModalController){}
  async openModal() {
  
    const modal = await this.modal_ctrl.create({
      component: ActivitiesModalComponent
    });

    await modal.present();
  }

  formatPrice(price?: number) {

    return formatPrice(price);

  }

  get past() {

    if (this.activity)
      return (new Date() >= new Date(this.activity.start_date));
    else
      return false;
  }

}
