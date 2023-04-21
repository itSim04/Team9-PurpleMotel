import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Facility } from 'src/app/models/Facility';

@Component({
  selector: 'app-facilities-modal',
  templateUrl: './facilities-modal.component.html',
  styleUrls: ['./facilities-modal.component.scss'],
})
export class FacilitiesModalComponent  implements OnInit {

  @Input() facility!: Facility;
  @Input() description!: string;


  constructor(private modal_params: NavParams, private modal_ctrl: ModalController) {
    
    this.facility = modal_params.get('data');
    this.description = modal_params.get('data').description;  
  }

  closeModal(){
    this.modal_ctrl.dismiss()
  }

  ngOnInit() {}

}
