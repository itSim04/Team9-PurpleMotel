import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantLandingComponent } from './landing-restaurant.component';

describe('MenuComponent', () => {
  let component: RestaurantLandingComponent;
  let fixture: ComponentFixture<RestaurantLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
