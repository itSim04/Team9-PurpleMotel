import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDatabaseComponent } from './order-database.component';

describe('OrderDatabaseComponent', () => {
  let component: OrderDatabaseComponent;
  let fixture: ComponentFixture<OrderDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
