import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { ModalController } from '@ionic/angular';
import { ActivitiesModalComponent } from './activities-modal/activities-modal.component';
import { KeyValue } from '@angular/common';
import { formatPrice } from '../database/database.component';



@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {


  ngOnInit() { }

  @Input() activity?: KeyValue<string, Activity>;

  constructor(private modal_ctrl: ModalController) { }
  async openModal() {

    const modal = await this.modal_ctrl.create({
      component: ActivitiesModalComponent,
      componentProps: {
        key: this.activity?.key,
        data: this.activity?.value,

      }

    });

    await modal.present();
  }

  
  closeModal() {
    this.modal_ctrl.dismiss();
  }

  formatPrice(price?: number) {

    return formatPrice(price);

  }

  get past() {

    if (this.activity)
      return (new Date() >= new Date(this.activity.value.start_date));
    else
      return false;
  }

}
