import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDatabaseComponent } from './announcement-database.component';

describe('AnnouncementDatabaseComponent', () => {
  let component: AnnouncementDatabaseComponent;
  let fixture: ComponentFixture<AnnouncementDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
