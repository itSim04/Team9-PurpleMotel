import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDatabaseComponent } from './news-database.component';

describe('NewsDatabaseComponent', () => {
  let component: NewsDatabaseComponent;
  let fixture: ComponentFixture<NewsDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
