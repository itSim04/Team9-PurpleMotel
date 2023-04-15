import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListPopupComponent } from './food-list-popup.component';

describe('FoodListPopupComponent', () => {
  let component: FoodListPopupComponent;
  let fixture: ComponentFixture<FoodListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodListPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
