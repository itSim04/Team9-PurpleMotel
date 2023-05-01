import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDatabaseComponent } from './room-database.component';

describe('RoomDatabaseComponent', () => {
  let component: RoomDatabaseComponent;
  let fixture: ComponentFixture<RoomDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
