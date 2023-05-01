import { TestBed } from '@angular/core/testing';

import { FoodListPopupService } from './food-list-popup.service';

describe('FoodListPopupService', () => {
  let service: FoodListPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodListPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
