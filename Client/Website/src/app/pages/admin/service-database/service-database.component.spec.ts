import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDatabaseComponent } from './service-database.component';

describe('ServiceDatabaseComponent', () => {
  let component: ServiceDatabaseComponent;
  let fixture: ComponentFixture<ServiceDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
