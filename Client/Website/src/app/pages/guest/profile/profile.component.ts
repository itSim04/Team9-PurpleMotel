import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { CarouselComponent } from 'src/app/components/general/carousel/carousel.component';
import { Booking } from 'src/app/models/Booking';
import { BrowsingDialogService } from 'src/app/services/dialogs/browsing/browsing.service';
import { BookingDatabaseService } from '../../admin/booking-database/booking-database.service';
import { ProfileDialogService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ])])]

})
export class ProfileComponent implements OnInit{

  bookings!: Map<string, Booking>;
  

  @ViewChild('carousel') carousel !: CarouselComponent;

  constructor(private browsing_service: BrowsingDialogService, private booking_service: BookingDatabaseService, private profile_service: ProfileDialogService){}

  edit_profile() {

    this.profile_service.openDialog("edit_profile");

  }

  change_password() {

    this.profile_service.openDialog("change_password");

  }
  
  async ngOnInit() {

    this.booking_service.getAllBookings()?.subscribe((result => {


  
      this.bookings = result.bookings;

    }));
    console.log(this.bookings);
  }
  
  browseBookingHistory = () => this.browseBookingHistoryHelper();


  browseBookingHistoryHelper() {

    const browsing = this.browsing_service.openDialog([
      this.bookings
    ]);
    browsing.afterClosed().subscribe(result => {
      if (result + 1 && result < this.bookings.size) {

        this.carousel.currentSlide = result;
        this.carousel.fixRatio();
      }
    });

  }
}
