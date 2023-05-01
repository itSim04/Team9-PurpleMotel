import { PromoCode } from './../../../../models/PromoCode';
import { KeyValue } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { RoomDatabaseService } from 'src/app/services/providers/room-database.service';

@Component({
  selector: 'app-room-overview',
  templateUrl: './room-overview.component.html',
  styleUrls: ['./room-overview.component.scss']
})
export class RoomOverviewComponent implements OnInit {

  loading = false;
  room?: KeyValue<string, Room>;
  room_type?: KeyValue<string, RoomType>;
  promo_code?: KeyValue<string, PromoCode>;
  current_page = 0;

  constructor(private route: ActivatedRoute, private room_service: RoomDatabaseService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {


    const key = this.route.snapshot.paramMap.getAll('id')[0];

    const room = localStorage.getItem('temp_room_item');
    const room_type = localStorage.getItem('temp_room_type_item');
    const promo = localStorage.getItem('temp_room_promo');

    localStorage.removeItem('temp_room_item');
    localStorage.removeItem('temp_room_type_item');
    localStorage.removeItem('temp_room_promo');

    if (room && room_type) {

      console.log("Room already exists");
      this.room = JSON.parse(room) as KeyValue<string, Room>;
      this.room_type = JSON.parse(room_type) as KeyValue<string, RoomType>;
      if (promo)
        this.promo_code = (JSON.parse(promo) as KeyValue<string, PromoCode>) || undefined;


    } else {

      this.loading = true;

      console.log("Room does not exist");

      this.room_service.getOneRoom(key).subscribe(room => {

        this.loading = false;
        this.room = {

          key: key,
          value: room.room.value

        };

        this.room_type = room.room_type;

        this.promo_code = room.promo_code;

        this.cdr.detectChanges()


        console.log(this.room);
        console.log(this.promo_code);


      });
    }
  }

  prev() {

    this.current_page--;

  }

  next() {

    this.current_page++;

  }


}
