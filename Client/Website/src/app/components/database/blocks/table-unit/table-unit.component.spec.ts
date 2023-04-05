import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableUnitComponent } from './table-unit.component';

describe('TableUnitComponent', () => {
  let component: TableUnitComponent<unknown, unknown>;
  let fixture: ComponentFixture<TableUnitComponent<unknown, unknown>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUnitComponent ],

    }).compileComponents();

    fixture = TestBed.createComponent(TableUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
