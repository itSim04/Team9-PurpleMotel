import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDatabaseComponent } from './image-database.component';

describe('ImageDatabaseComponent', () => {
  let component: ImageDatabaseComponent;
  let fixture: ComponentFixture<ImageDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
