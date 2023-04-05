import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeComponent } from './change.component';

describe('ChangeComponent', () => {
  let component: ChangeComponent<unknown>;
  let fixture: ComponentFixture<ChangeComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
