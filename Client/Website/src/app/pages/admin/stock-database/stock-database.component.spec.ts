import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDatabaseComponent } from './stock-database.component';

describe('StockDatabaseComponent', () => {
  let component: StockDatabaseComponent;
  let fixture: ComponentFixture<StockDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
