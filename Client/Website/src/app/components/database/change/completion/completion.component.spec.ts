import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionComponent } from './completion.component';

describe('CompletionComponent', () => {
  let component: CompletionComponent<any>;
  let fixture: ComponentFixture<CompletionComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
