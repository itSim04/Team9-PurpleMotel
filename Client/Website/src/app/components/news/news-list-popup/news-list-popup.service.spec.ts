import { TestBed } from '@angular/core/testing';

import { NewsListPopupService } from './news-list-popup.service';

describe('NewsListPopupService', () => {
  let service: NewsListPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsListPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
