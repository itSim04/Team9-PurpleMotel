import { parseDate } from 'src/app/services/dialogs/authentication/authentication.utility';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @Output() result: EventEmitter<{ check_in: Date, check_out: Date }> = new EventEmitter();

  ngOnInit() {

    this.range.valueChanges.subscribe(data => {

      this.emit();

    });

  }

  filter = (d: Date | null): boolean => {

    // Prevent Saturday and Sunday from being selected.
    return true;

  };

  emit() {

    if (this.range.value.end && this.range.value.start) {
      this.result.emit({

        check_in: this.range.value.start,
        check_out: this.range.value.end

      });
    }

  }

}
