import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Interface } from 'readline';
import { Required } from 'src/app/components/database/database.component';
import { Activity } from 'src/app/models/Activity';

export interface ProfileModalData {

  title?: string;
  body?: string;
  price?: number;
  start_date?: string;
  end_date?: string;

}

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent {

  @Input() @Required data?: ProfileModalData


  constructor(private modal_ctrl: ModalController) {



  }


  closeModal() {
    this.modal_ctrl.dismiss();
  }



}
