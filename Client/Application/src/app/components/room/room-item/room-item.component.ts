import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { Router } from '@angular/router';
import { formatPrice } from '../../database/database.component';
import { ModalController } from '@ionic/angular';
import { RoomModalComponent } from '../room-modal/room-modal.component';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {

  ngOnInit() { }

  @Input() room?: KeyValue<string, Room>;
  @Input() room_type?: KeyValue<string, RoomType>;

  constructor(private modal_ctrl: ModalController) { }
  async openModal() {

    const modal = await this.modal_ctrl.create({
      component: RoomModalComponent,
      componentProps: {
        key: this.room?.key,
        data: this.room?.value,
      }

    });
    await modal.present();
  }

  closeModal() {
    this.modal_ctrl.dismiss();
  }

  get formatPrice(): string {

    return formatPrice(this.room_type?.value.price);

  }



  // route() {

  //   if(this.room) {

  //     localStorage.setItem('temp_room_item', JSON.stringify(this.room));
  //     localStorage.setItem('temp_room_type_item', JSON.stringify(this.room_type));

  //     this.router.navigate([`/rooms/details/${this.room.key}`])

  //   }

}

