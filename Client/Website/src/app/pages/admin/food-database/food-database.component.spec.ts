import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDatabaseComponent } from './food-database.component';

describe('FoodDatabaseComponent', () => {
  let component: FoodDatabaseComponent;
  let fixture: ComponentFixture<FoodDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
