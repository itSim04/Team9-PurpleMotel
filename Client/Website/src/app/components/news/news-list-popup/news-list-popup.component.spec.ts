import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListPopupComponent } from './news-list-popup.component';

describe('NewsListPopupComponent', () => {
  let component: NewsListPopupComponent;
  let fixture: ComponentFixture<NewsListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsListPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
