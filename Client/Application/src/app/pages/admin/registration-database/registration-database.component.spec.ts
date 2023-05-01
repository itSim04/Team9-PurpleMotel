import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDatabaseComponent } from './registration-database.component';

describe('RegistrationDatabaseComponent', () => {
  let component: RegistrationDatabaseComponent;
  let fixture: ComponentFixture<RegistrationDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
