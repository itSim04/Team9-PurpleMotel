import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Facility } from 'src/app/models/Facility';
import { ServiceDatabaseService } from './facilities.service';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { ModalController } from '@ionic/angular';
import { FacilitiesModalComponent } from './facilities-modal/facilities-modal.component';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent{

  @Input() facility?: Facility;

  constructor(private modal_ctrl: ModalController){}
  async openModal() {

    const modal = await this.modal_ctrl.create({
      component: FacilitiesModalComponent
    });
  
    await modal.present();
  }
  
  
}
