import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quick-availability',
  templateUrl: './quick-availability.component.html',
  styleUrls: ['./quick-availability.component.scss']
})
export class QuickAvailabilityComponent {

  @Output() start_date: EventEmitter<Date> = new EventEmitter();
  @Output() end_date: EventEmitter<Date> = new EventEmitter();
  @Output() adults: EventEmitter<number> = new EventEmitter();
  @Output() kids: EventEmitter<number> = new EventEmitter();

  start_date_value: Date = new Date();
  end_date_value: Date = new Date();
  adults_value: number = 0;
  kids_value: number = 0;

  checkAvailability() {

    this.start_date.emit(this.start_date_value);
    this.end_date.emit(this.end_date_value);
    this.adults.emit(this.adults_value);
    this.kids.emit(this.kids_value);
    
  }
}
