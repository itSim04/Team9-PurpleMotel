import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAvailabilityComponent } from './quick-availability.component';

describe('QuickAvailabilityComponent', () => {
  let component: QuickAvailabilityComponent;
  let fixture: ComponentFixture<QuickAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
