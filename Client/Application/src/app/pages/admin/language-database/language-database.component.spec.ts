import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDatabaseComponent } from './language-database.component';

describe('LanguageDatabaseComponent', () => {
  let component: LanguageDatabaseComponent;
  let fixture: ComponentFixture<LanguageDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
