import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseRoomsPage } from './browse-rooms.page';

describe('BrowseRoomsPage', () => {
  let component: BrowseRoomsPage;
  let fixture: ComponentFixture<BrowseRoomsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BrowseRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
