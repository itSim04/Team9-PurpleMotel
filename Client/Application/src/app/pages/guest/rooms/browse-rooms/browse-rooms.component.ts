import { Component, OnInit } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { Room } from 'src/app/models/Room';
import { RoomDatabaseService } from 'src/app/pages/admin/room-database/room-database.service';

@Component({
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.html',
  styleUrls: ['./browse-rooms.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ])])]
})
export class BrowseRoomsPage implements OnInit {

  rooms: Map<string, Room> = new Map();


  constructor(private rooms_service: RoomDatabaseService) { }


  ngOnInit() {

    this.rooms_service.getAllRooms().subscribe(data => {

      this.rooms = data.rooms;

    });

  }

}
