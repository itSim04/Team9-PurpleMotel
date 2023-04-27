import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  image?: string;
  button?: {
    
    label: string;
    action: (...args: unknown[]) => void;
    
  }
  stored_data?: unknown;
  show_num_input?: boolean;

}

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent {

  @Input() @Required data?: ProfileModalData
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  performAction() {

    if (this.data?.button?.action)
      this.data.button.action(this.data.stored_data);


  }



}
