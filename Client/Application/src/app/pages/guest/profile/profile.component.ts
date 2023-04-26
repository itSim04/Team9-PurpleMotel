import { animate, style, transition, trigger } from "@angular/animations";
import { KeyValue } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AnimationController, ModalController } from "@ionic/angular";
import { ActivitiesModalComponent } from "src/app/components/activities/activities-modal/activities-modal.component";
import { extractUser } from "src/app/components/database/database.component";
import { Activity } from "src/app/models/Activity";
import { Booking } from "src/app/models/Booking";
import { Food } from "src/app/models/Food";
import { Order } from "src/app/models/Order";
import { PromoCode } from "src/app/models/PromoCode";
import { Registration } from "src/app/models/Registration";
import { Room } from "src/app/models/Room";
import { RoomType } from "src/app/models/RoomType";
import { User } from "src/app/models/User";
import { BookingDatabaseService } from "src/app/services/providers/booking-database.service";
import { RegistrationDatabaseService } from "src/app/services/providers/registration-database.service";
import { RoomDatabaseService } from "src/app/services/providers/room-database.service";
import { AuthenticationDialogService } from "src/app/services/utility/authentication.service";
import { ProfileService } from "src/app/services/utility/profile.service";
import { ProfileModalComponent, ProfileModalData } from "./profile-modal/profile-modal.component";
import { OrderDatabaseService } from "src/app/services/providers/order-database.service";


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
formatActivity(registration: KeyValue<string, Registration>): ProfileModalData {

  const activity = this.activities.get(registration.value.activity_id)!;


    return {

      title: activity.title,
      body: activity.description,
      price: activity.price,
      start_date: activity.start_date,
      end_date: activity.end_date,
      image: activity.image[0],
      button: {
        label: 'Cancel',
        action: () => {
            
            this.registration_service.deleteRegistration(registration.key).subscribe(() => {
  
              this.registrations.delete(registration.key);
              this.closeModal();
  
            });
  
        }
      }
    }
}
  formatBooking(booking: KeyValue<string, Booking>): ProfileModalData {

    const room = this.rooms.get(booking.value.room_id)!;
    const room_type = this.room_types.get(room.type || '0')!;

    return {


      title: room.label,
      body: room.description,
      price: room_type.price,
      start_date: booking.value.check_in,
      end_date: booking.value.end_date,
      image: room.images[0],
      button: {

        label: 'Cancel',
        action: () => {

          this.booking_service.deleteBooking(booking.key).subscribe(() => {

            this.bookings.delete(booking.key);
            this.closeModal();

          });

        }
      }

    }
  }


  bookings!: Map<string, Booking>;
  orders!: Map<string, Order>;
  rooms!: Map<string, Room>;
  foods!: Map<string, Food>;
  room_types!: Map<string, RoomType>;
  activities!: Map<string, Activity>;
  registrations!: Map<string, Registration>;
  promo: Map<string, PromoCode> = new Map();
  user: User;
  first_name;
  last_name;

  active_data?: ProfileModalData;

  isModalOpen: boolean = false;

  constructor(private animationCtrl: AnimationController, private order_service: OrderDatabaseService, private browsing_service: BookingDatabaseService, private profile_service: ProfileService, private router: Router, private booking_service: BookingDatabaseService, private registration_service: RegistrationDatabaseService, private room_service: RoomDatabaseService, private authentication: AuthenticationDialogService, private modal_ctrl: ModalController) {

    const user = extractUser()!;


    this.user = user;
    this.first_name = this.user.first_name;
    this.last_name = this.user.last_name;



  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  formatOrder(order: KeyValue<string, Order>): ProfileModalData {


    const ingredients = order.value.food;
    const food_ids = ingredients.map(t => t.id);

    const foods = Array.from(this.foods).filter(t => food_ids.includes(t[0]));

    const body = [];

    for (let i = 0; i < foods.length; i++) {

      body.push(foods[i][1].label + ' ' + ingredients[i].quantity);

    }

    let price = 0;

    foods.forEach(t => price += t[1].price);

    return {
      body: body.join('\n'),
      price: price,
      start_date: order?.value.date,
      image: foods[0][1].image,
      button: {

        label: 'Cancel',
        action: () => {


          this.order_service.deleteOrder(order.key).subscribe(() => {


            this.orders.delete(order.key);
            this.closeModal();

          });
        }
      }

    }
  }

  get booking_array() {

    return Array.from(this.bookings || [])

  }
  get registration_array() {

    return Array.from(this.registrations || [])

  }

  keyDescOrder = (a: KeyValue<string, Booking>, b: KeyValue<string, Booking>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };
  activity_key = (a: KeyValue<string, Registration>, b: KeyValue<string, Registration>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };
  order_key = (a: KeyValue<string, Order>, b: KeyValue<string, Order>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };


  image(index: number) {

    return '../../../../assets/food-' + ((index % 8) + 1) + '.jpg';
  }

  async openModal(data: ProfileModalData) {

    this.active_data = undefined;

    this.isModalOpen = true;

    this.active_data = data;

  }

  async closeModal() {



    this.active_data = undefined;

    this.isModalOpen = false;

  }
  // edit_profile() {

  //   this.profile_service.openDialog("edit_profile");

  // }

  // change_password() {

  //   this.profile_service.openDialog("change_password");

  // }




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
        this.promo = data.promo;


        console.log(data);
      },
      error: error => {

        console.error(error);
        if (error.status) {


          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('token_time');
          this.router.navigate(['/auth']);

        }

      }

    });



  }


  reviewRoom(room_id: string) {

    console.log(room_id);

    // const dialog = this.review_service.openDialog(room_id);

    // dialog.afterClosed().subscribe(result => {

    //   if (result) {

    //     this.room_service.addReview(result).subscribe(() => {

    //       const room = this.rooms.get(room_id);
    //       if (room) room.is_reviewed = true;
    //       this.snackBar.open('Review added', 'Dismiss', { duration: 2000 });

    //     });

    //   }

    // });

  }
  openOrder(order: Order) {

    // this.order.openDialog({

    //   food: this.foods,
    //   order: order

    // });

  }

  deleteBooking($event: string) {

    // const dialogRef = this.confirmation.openDialog('Booking Cancellation', 'Are you sure you want to cancel this booking?', 'Delete', 'Cancel');

    // dialogRef.afterClosed().subscribe(result => {


    //   if (result) {
    //     this.booking_service.deleteBooking($event).subscribe(() => {

    //       this.snackBar.open('Booking deleted', 'Dismiss', { duration: 2000 });
    //       this.bookings.delete($event);
    //       if (this.carousel.currentSlide >= this.bookings.size) {

    //         this.carousel.currentSlide = this.bookings.size - 1;
    //         this.carousel.initiateCarousel();
    //       }
    //     });
    //   }
    // });

  }
  deleteRegistration($event: string) {

    // const dialogRef = this.confirmation.openDialog('Registration Cancellation', 'Are you sure you want to cancel this registration?', 'Delete', 'Cancel');

    // dialogRef.afterClosed().subscribe(result => {


    //   if (result) {
    //     this.registration_service.deleteRegistration($event).subscribe(() => {

    //       this.snackBar.open('Registration deleted', 'Dismiss', { duration: 2000 });
    //       this.registrations.delete($event);
    //     });
    //   }
    // });

  }

  applyCode() {
    // this.promo_service.openDialog();
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token_time');
    this.router.navigate(['/home']);


  }

  selected: 'rooms' | 'services' = 'rooms';

  onSegmentChange(event: any) {

    const selectedValue = event.detail.value;

    if (selectedValue === 'rooms') {
      this.selected = 'rooms';
    } else if (selectedValue === 'services') {
      this.selected = 'services'
    }
  }
}