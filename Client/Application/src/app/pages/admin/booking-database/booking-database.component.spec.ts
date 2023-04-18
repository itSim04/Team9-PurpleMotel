import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDatabaseComponent } from './booking-database.component';

describe('BookingDatabaseComponent', () => {
  let component: BookingDatabaseComponent;
  let fixture: ComponentFixture<BookingDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
