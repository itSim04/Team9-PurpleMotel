import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWrapperComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarWrapperComponent;
  let fixture: ComponentFixture<CalendarWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
