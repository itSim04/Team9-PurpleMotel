import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoDatabaseComponent } from './promo-database.component';

describe('PromoDatabaseComponent', () => {
  let component: PromoDatabaseComponent;
  let fixture: ComponentFixture<PromoDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
