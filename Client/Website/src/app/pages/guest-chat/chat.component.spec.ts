import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatsPageComponent } from './chat.component';

describe('ChatsPage', () => {
  let component: ChatsPageComponent;
  let fixture: ComponentFixture<ChatsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsPageComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
