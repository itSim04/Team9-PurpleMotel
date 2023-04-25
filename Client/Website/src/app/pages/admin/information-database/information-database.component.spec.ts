import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDatabaseComponent } from './information-database.component';

describe('InformationDatabaseComponent', () => {
  let component: InformationDatabaseComponent;
  let fixture: ComponentFixture<InformationDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
