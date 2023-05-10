import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AnimationController, ModalController } from "@ionic/angular";
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
import { AuthenticationService } from "src/app/services/utility/authentication.service";
import { ProfileService } from "src/app/services/utility/profile.service";
import { ProfileModalData } from "./profile-modal/profile-modal.component";
import { OrderDatabaseService } from "src/app/services/providers/order-database.service";
import { UrlBuilderService } from "src/app/services/utility/url-builder.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],

})
export class ProfileComponent implements OnInit {

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

  booking_array: [string, Booking][] = [];

  registration_array: [string, Registration][] = [];
  last_name;

  active_data?: ProfileModalData;

  isModalOpen: boolean = false;
  profile_bg = this.url.getImage('profile-main');
  selected: 'rooms' | 'services' = 'rooms';

  constructor (private animationCtrl: AnimationController, private order_service: OrderDatabaseService, private profile_service: ProfileService, private router: Router, private booking_service: BookingDatabaseService, private registration_service: RegistrationDatabaseService, private url: UrlBuilderService) {

    const user = extractUser()!;


    this.user = user;
    this.first_name = this.user.first_name;
    this.last_name = this.user.last_name;



  }
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
            this.registration_array = Array.from(this.registrations || []).reverse();
            this.closeModal();

          });

        }
      }
    };
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
            this.booking_array = Array.from(this.bookings || []).reverse();
            this.closeModal();

          });

        }
      },
      custom_action: {

        icon: 'bar-chart-outline',
        id: booking.value.room_id,
        display: !room.is_reviewed

      }

    };
  }



  ionViewWillEnter() {

    const temp_booking = localStorage.getItem('temp_profile_booking');
    const temp_room = localStorage.getItem('temp_profile_room');
    const temp_room_type = localStorage.getItem('temp_profile_room_type');

    if (temp_booking && temp_room && temp_room_type) {

      const booking = JSON.parse(temp_booking) as KeyValue<string, Booking>;
      this.bookings.set(booking.key, booking.value);
      localStorage.removeItem('temp_profile_booking');

      const room = JSON.parse(temp_booking) as KeyValue<string, Room>;
      this.rooms.set(room.key, room.value);
      localStorage.removeItem('temp_profile_room');

      const room_type = JSON.parse(temp_booking) as KeyValue<string, RoomType>;
      this.room_types.set(room_type.key, room_type.value);
      localStorage.removeItem('temp_profile_room_type');

    }

    this.booking_array = Array.from(this.bookings || []).reverse();
    this.registration_array = Array.from(this.registrations || []).reverse();

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
      title: this.getStatus(Number.parseInt(order.value.status || '0')),
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

    };
  }

  getStatus(code: number) {

    switch (code) {

      case 0:

        return 'Pending';

      case 1:

        return 'Preparing';

      case 2:

        return 'Ready';

      case 3:

        return 'Delivering';
    }
    return '';
  }


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


        this.booking_array = Array.from(this.bookings || []).reverse();
        this.registration_array = Array.from(this.registrations || []).reverse();

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

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token_time');
    this.router.navigate(['/home']);


  }


  onSegmentChange(event: any) {

    const selectedValue = event.detail.value;

    if (selectedValue === 'rooms') {
      this.selected = 'rooms';
    } else if (selectedValue === 'services') {
      this.selected = 'services';
    }
  }
}