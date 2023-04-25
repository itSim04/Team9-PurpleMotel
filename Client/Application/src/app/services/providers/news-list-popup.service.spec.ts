import { TestBed } from '@angular/core/testing';
import { NewsListPopupService } from 'src/app/components/news/news-list-popup/news-list-popup.service';

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
