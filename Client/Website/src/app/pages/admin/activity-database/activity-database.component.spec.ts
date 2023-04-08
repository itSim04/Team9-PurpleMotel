import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDatabaseComponent } from './activity-database.component';

describe('ActivityDatabaseComponent', () => {
  let component: ActivityDatabaseComponent;
  let fixture: ComponentFixture<ActivityDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
