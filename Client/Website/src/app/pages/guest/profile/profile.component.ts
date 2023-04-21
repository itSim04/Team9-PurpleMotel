import { ReviewDialogService } from './../../../services/utility/review.service';
import { RoomDatabaseService } from 'src/app/services/providers/room-database.service';
import { Food } from './../../../models/Food';
import { OrderOverviewDialogService } from './../../../services/utility/order-overview.service';
import { RegistrationDatabaseService } from './../../../services/providers/registration-database.service';
import { ConfirmationDialogService } from './../../../services/utility/confirmation.service';
import { BookingDatabaseService } from './../../../services/providers/booking-database.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './../../../models/User';
import { Order } from 'src/app/models/Order';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';
import { KeyValue } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from 'src/app/components/general/carousel/carousel.component';
import { Booking } from 'src/app/models/Booking';
import { Room } from 'src/app/models/Room';
import { RoomType } from 'src/app/models/RoomType';
import { extractUser } from 'src/app/components/database/database.component';
import { Router } from '@angular/router';
import { BrowsingDialogService } from 'src/app/services/utility/browsing.service';
import { ProfileService } from 'src/app/services/utility/profile.service';
import { PromoDialogService } from 'src/app/services/utility/promo.service';
import { AuthenticationDialogService } from 'src/app/services/utility/authentication.service';

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
export class ProfileComponent implements OnInit {


  bookings!: Map<string, Booking>;
  orders!: Map<string, Order>;
  rooms!: Map<string, Room>;
  foods!: Map<string, Food>;
  room_types!: Map<string, RoomType>;
  activities!: Map<string, Activity>;
  registrations!: Map<string, Registration>;
  user: User;
  first_name;
  last_name;



  keyDescOrder = (a: KeyValue<string, Booking>, b: KeyValue<string, Booking>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };
  activity_key = (a: KeyValue<string, Registration>, b: KeyValue<string, Registration>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };
  order_key = (a: KeyValue<string, Order>, b: KeyValue<string, Order>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };

  @ViewChild('carousel') carousel !: CarouselComponent;
  // food from 1 to 8

  image(index: number) {

    return '../../../../assets/food-' + ((index % 8) + 1) + '.jpg';

  }
  constructor (private profile_service: ProfileService, private router: Router, private promo_service: PromoDialogService, private booking_service: BookingDatabaseService, private snackBar: MatSnackBar, private confirmation: ConfirmationDialogService, private registration_service: RegistrationDatabaseService, private order: OrderOverviewDialogService, private review_service: ReviewDialogService, private room_service: RoomDatabaseService, private authentication: AuthenticationDialogService) {

    const user = extractUser()!;


    this.user = user;
    this.first_name = this.user.first_name;
    this.last_name = this.user.last_name;



  }



  ngOnInit() {

    this.profile_service.getAllData().subscribe({

      next: data => {
        this.bookings = data.bookings;
        this.orders = data.orders;
        this.rooms = data.rooms;
        this.room_types = data.room_types;
        this.activities = data.activities;
        this.registrations = data.registrations;
        this.foods = data.foods;

        console.log(this.rooms);
      },
      error: error => {

        if (error.status) {


          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('token_time');
          this.router.navigate(['/home']);
          this.authentication.openDialog('login');

        }

      }

    });



  }

  reviewRoom(room_id: string) {

    console.log(room_id);

    const dialog = this.review_service.openDialog(room_id);

    dialog.afterClosed().subscribe(result => {

      if (result) {

        this.room_service.addReview(result).subscribe(() => {

          this.snackBar.open('Review added', 'Dismiss', { duration: 2000 });

        });

      }

    });

  }
  openOrder(order: Order) {

    this.order.openDialog({

      food: this.foods,
      order: order

    });

  }

  deleteBooking($event: string) {

    const dialogRef = this.confirmation.openDialog('Booking Cancellation', 'Are you sure you want to cancel this booking?', 'Delete', 'Cancel');

    dialogRef.afterClosed().subscribe(result => {


      if (result) {
        this.booking_service.deleteBooking($event).subscribe(() => {

          this.snackBar.open('Booking deleted', 'Dismiss', { duration: 2000 });
          this.bookings.delete($event);
          if (this.carousel.currentSlide >= this.bookings.size) {

            this.carousel.currentSlide = this.bookings.size - 1;
            this.carousel.initiateCarousel();
          }
        });
      }
    });

  }
  deleteRegistration($event: string) {

    const dialogRef = this.confirmation.openDialog('Registration Cancellation', 'Are you sure you want to cancel this registration?', 'Delete', 'Cancel');

    dialogRef.afterClosed().subscribe(result => {


      if (result) {
        this.registration_service.deleteRegistration($event).subscribe(() => {

          this.snackBar.open('Registration deleted', 'Dismiss', { duration: 2000 });
          this.registrations.delete($event);
        });
      }
    });

  }

  applyCode() {
    this.promo_service.openDialog();
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token_time');
    this.router.navigate(['/home']);


  }
}